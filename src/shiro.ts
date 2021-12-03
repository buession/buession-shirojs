import { Principal, Shiro } from './core/types'

import { hasAny, hasAll } from './utils/common'

export class ShiroImpl implements Shiro {

	private readonly $principal:Principal;

	constructor(public principal:Principal) {
		this.$principal = principal;
	}
	
	/**
	 * 验证是否为已认证通过的用户，不包含已记住的用户，这是与 isUser 标签方法的区别所在
	 * 
	 * @return 用户是否已通过认证
	*/
	isAuthenticated(): boolean {
		return this.$principal !== null;
	}

    /**
	 * 验证是否为未认证通过用户，与 isAuthenticated 标签相对应，与 isGuest 标签的区别是，该标签包含已记住用户
	 *
	 * @return 用户是否未通过认证
	 */
	isNotAuthenticated(): boolean {
		return this.isAuthenticated() === false;
	}

    /**
	 * 验证用户是否为访客，即未认证（包含未记住）的用户
	 *
	 * @return 用户是否为访客
	 */
	isGuest(): boolean {
		return this.$principal === null;
	}

    /**
	 * 验证用户是否认证通过或已记住的用户
	 *
	 * @return 用户是否认证通过或已记住的用户
	 */
	isUser(): boolean {
		return this.$principal !== null;
	}

	/**
	 * 验证用户是否具备某角色。
	 *
	 * @param roleName
	 * 		角色名称
	 *
	 * @return 用户是否具备某角色
	 */
	hasRole(roleName:string): boolean {
		return this.isAuthenticated() && hasAny(this.$principal.getRoles(), roleName);
	}

	/**
	 * 验证用户是否不具备某角色，与 hasRole 逻辑相反
	 *
	 * @param roleName
	 * 		角色名称
	 *
	 * @return 用户是否不具备某角色
	 */
	lacksRole(roleName:string): boolean {
		return this.hasRole(roleName) === false;
	}

	/**
	 * 验证用户是否具有以下任意一个角色
	 *
	 * @param roleNames
	 * 		角色列表
	 *
	 * @return 用户是否具有以下任意一个角色
	 */
	hasAnyRole(roleNames:string[]): boolean {
		if (this.isAuthenticated() == false) {
			return false;
		}

		for (let roleName of roleNames) {
			if (hasAny(this.$principal.getRoles(), roleName)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * 验证用户是否具有以下所有角色。
	 *
	 * @param roleNames
	 * 		角色列表
	 *
	 * @return 用户是否具有以下所有角色
	 */
	hasRolesAll(roleNames:string[]): boolean {
		return this.isAuthenticated() && hasAll(this.$principal.getRoles(), roleNames);
	}

	/**
	 * 验证用户是否具备某权限
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否具备某权限
	 */
	hasPermission(permission:string): boolean {
		return this.isAuthenticated() && hasAny(this.$principal.getPermissions(), permission);
	}

	/**
	 * 验证用户是否不具备某权限，与 hasPermission 逻辑相反
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否不具备某权限
	 */
	lacksPermission(permission:string): boolean {
		return this.hasPermission(permission) === false;
	}

	/**
	 * 验证用户是否具有以下任意一个权限
	 *
	 * @param permissions
	 * 		权限列表
	 *
	 * @return 用户是否具有以下任意一个权限
	 */
	hasAnyPermission(permissions:string[]): boolean {
		if (this.isAuthenticated() == false) {
			return false;
		}

		for (let permission of permissions) {
			if (hasAny(this.$principal.getPermissions(), permission)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * 验证用户是否具有以下所有权限
	 *
	 * @param permissions
	 * 		权限列表
	 *
	 * @return 用户是否具有以下所有权限
	 */
	hasPermissionsAll(permissions:string[]): boolean {
		return hasAll(this.$principal.getPermissions(), permissions);
	}

}