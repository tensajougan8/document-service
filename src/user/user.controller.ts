// src/user/user.controller.ts
import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users (Admin only)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Only admin can access
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Update user role (Admin only)
  @Post('update-role/:username')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Only admin can update roles
  updateUserRole(
    @Param('username') username: string,
    @Body('role') newRole: string,
  ) {
    return this.userService.updateUserRole(username, newRole);
  }
}
