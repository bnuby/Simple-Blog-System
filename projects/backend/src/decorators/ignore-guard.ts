import { SetMetadata, CustomDecorator } from "@nestjs/common";

export const IgnoreGuard = (): CustomDecorator => SetMetadata('ignore', true);