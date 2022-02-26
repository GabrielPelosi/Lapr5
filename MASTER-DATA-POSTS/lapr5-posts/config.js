import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
//
export default { 
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3001,
  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    post: {
      name: "PostController",
      path: "../controllers/postController"
    },
    comment: {
      name: "CommentController",
      path: "../controllers/commentController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    post: {
      name: "PostRepo",
      path: "../repos/postRepo"
    },
    comment: {
      name: "CommentRepo",
      path: "../repos/commentRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    post: {
      name: "PostService",
      path: "../services/postService"
    },
    comment: {
      name: "CommentService",
      path: "../services/commentService"
    }
  },
};
