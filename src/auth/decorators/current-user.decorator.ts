import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const getCurrentUserByContext = (context: ExecutionContext) => {
  switch (context.getType()) {
    case 'http': {
      return context.switchToHttp().getRequest().user;
    }
    case 'rpc': {
      return context.switchToRpc().getData().user;
    }
    default: {
      throw new Error('Unknown type of context');
    }
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
);
