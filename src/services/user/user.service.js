import User from "../../Models/user";
import jwtHelper from "../../authService/jwt";
import bcryptHelper from "../../authService/bcrypt";

const { generateToken, refreshToken } = jwtHelper;
const { hashPassword } = bcryptHelper;

export const createUser = async (firstName, lastName, email, password) => {
  try {
    const checkEmail = await User.findOne({ email: email });

    if (checkEmail) {
      return {
        status: false,
        message: "email already in use.",
      };
    }

    const pwd = await hashPassword(password);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: pwd,
    });

    const token = await generateToken({ userData });
    const refreshedToken = await refreshToken({ userData });

    return {
      status: true,
      message: "User created successfully!",
      data: {
        userData,
        accessToken: token,
        refreshToken: refreshedToken,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const loginUser = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        status: false,
        message: "invalid email and password",
      };
    }
    const token = await generateToken({ user });
    const refreshedToken = await refreshToken({ user });

    return {
      status: true,
      message: "logged in!",
      data: {
        user,
        accessToken: token,
        refreshToken: refreshedToken,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const fectchUsers = async (page, limit) => {
  try {
    page = page < 1 ? 1 : page;
    limit = 10;
  
    // get total documents in the Products collection
    let count = await User.countDocuments();
    let totalPages = Math.ceil(count / limit);
    page = page > totalPages ? totalPages : page;
    const user = await User.find({ deleted: false})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    return {
      status: true,
      message: "Users fetched successfully!",
      meta: {
        totalPages: totalPages,
        currentPage: page,
        totalUsers: count,
      },
      data: user,
    };
    
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const fectchSingleUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id, deleted: false }).exec();
    if (!user || user.deleted === true) {
      return {
        status: false,
        message: "Invalid user.",
      };
    }
    return {
      status: true,
      message: "User fetched successfully!",
      data: user,
    };
    
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const updateUser = async (loggedUserId, photo) => {
  try {
    const user = new User({
      photo
    });
  
    await User.findOneAndUpdate(
      {
        _id: loggedUserId,
        deleted: false
      },
      {
        $set: { photo: user.photo },
      }
    );
  
    return {
      status: true,
      message: "User updated successfully!",
    };
    
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id, deleted: false }).exec();
    if (!user || user.deleted === true) {
      return {
        status: false,
        message: "Invalid user.",
      };
    }
    user.deleted = true;
    await user.save();
    return {
      status: true,
      message: "User deleted successfully!",
    };
    
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
