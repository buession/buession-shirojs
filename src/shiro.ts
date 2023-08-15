import { ALL_PERMISSION } from './core/constants'
import { PrincipalObject, Principal, DefaultPrincipal } from './core/principal'
import { hasAny, hasAll } from './utils/common'

export interface IShiro {
	
	/**
	 * 验证是否为已认证通过的用户，不包含已记住的用户，这是与 isUser 标签方法的区别所在
	 * 
	 * @return 用户是否已通过认证
	 */
	isAuthenticated(): boolean;

  /**
	 * 验证是否为未认证通过用户，与 isAuthenticated 标签相对应，与 isGuest 标签的区别是，该标签包含已记住用户
	 *
	 * @return 用户是否未通过认证
	 */
	isNotAuthenticated(): boolean;

  /**
	 * 验证用户是否为访客，即未认证（包含未记住）的用户
	 *
	 * @return 用户是否为访客
	 */
	isGuest(): boolean;

  /**
	 * 验证用户是否认证通过或已记住的用户
	 *
	 * @return 用户是否认证通过或已记住的用户
	 */
	isUser(): boolean;

	/**
	 * 验证用户是否具备某角色。
	 *
	 * @param roleName
	 * 		角色名称
	 *
	 * @return 用户是否具备某角色
	 */
	hasRole(roleName: string): boolean;

	/**
	 * 验证用户是否不具备某角色，与 hasRole 逻辑相反
	 *
	 * @param roleName
	 * 		角色名称
	 *
	 * @return 用户是否不具备某角色
	 */
	lacksRole(roleName: string): boolean;

	/**
	 * 验证用户是否具有以下任意一个角色
	 *
	 * @param roleNames
	 * 		角色列表
	 *
	 * @return 用户是否具有以下任意一个角色
	 */
	hasAnyRole(roleNames: string[]): boolean;

	/**
	 * 验证用户是否具有以下所有角色
	 *
	 * @param roleNames
	 * 		角色列表
	 *
	 * @return 用户是否具有以下所有角色
	 */
	hasRolesAll(roleNames: string[]): boolean;

	/**
	 * 验证用户是否具备某权限
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否具备某权限
	 */
	hasPermission(permission: string): boolean;

	/**
	 * 验证用户是否不具备某权限，与 hasPermission 逻辑相反
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否不具备某权限
	 */
	lacksPermission(permission: string): boolean;

	/**
	 * 验证用户是否具有以下任意一个权限
	 *
	 * @param permissions
	 * 		权限列表
	 *
	 * @return 用户是否具有以下任意一个权限
	 */
	hasAnyPermission(permissions: string[]): boolean;

	/**
	 * 验证用户是否具有以下所有权限
	 *
	 * @param permissions
	 * 		权限列表
	 *
	 * @return 用户是否具有以下所有权限
	 */
	hasPermissionsAll(permissions: string[]): boolean;

}

export class Shiro implements IShiro {

	private readonly principal: Principal;

	constructor(principal: Principal | PrincipalObject) {
		const $principal = principal as PrincipalObject;

		if (typeof $principal.id === 'string' && Array.isArray($principal.roles) && Array.isArray($principal.permissions)) {
			this.principal = new DefaultPrincipal($principal.id, $principal.roles, $principal.permissions);
		} else {
			this.principal = principal as Principal;
		}
	}

	/**
	 * 验证是否为已认证通过的用户，不包含已记住的用户，这是与 isUser 标签方法的区别所在
	 * 
	 * @return 用户是否已通过认证
	 */
	isAuthenticated(): boolean {
		return this.principal !== null;
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
		return this.principal === null;
	}

  /**
	 * 验证用户是否认证通过或已记住的用户
	 *
	 * @return 用户是否认证通过或已记住的用户
	 */
	isUser(): boolean {
		return this.principal !== null;
	}

	/**
	 * 验证用户是否具备某角色。
	 *
	 * @param roleName
	 * 		角色名称
	 *
	 * @return 用户是否具备某角色
	 */
	hasRole(roleName: string): boolean {
		return this.isAuthenticated() && hasAny(this.principal.getRoles(), roleName);
	}

	/**
	 * 验证用户是否不具备某角色，与 hasRole 逻辑相反
	 *
	 * @param roleName
	 * 		角色名称
	 *
	 * @return 用户是否不具备某角色
	 */
	lacksRole(roleName: string): boolean {
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
	hasAnyRole(roleNames: string[]): boolean {
		if (this.isAuthenticated() == false) {
			return false;
		}

		for (let i = 0; i < roleNames.length; i++) {
			if (hasAny(this.principal.getRoles(), roleNames[i])) {
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
	hasRolesAll(roleNames: string[]): boolean {
		return this.isAuthenticated() && hasAll(this.principal.getRoles(), roleNames);
	}

	/**
	 * 验证用户是否具备某权限
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否具备某权限
	 */
	hasPermission(permission: string): boolean {
		return this.isAuthenticated() && (hasAny(this.principal.getPermissions(), permission) || hasAny(this.principal.getPermissions(), ALL_PERMISSION));
	}

	/**
	 * 验证用户是否不具备某权限，与 hasPermission 逻辑相反
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否不具备某权限
	 */
	lacksPermission(permission: string): boolean {
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
	hasAnyPermission(permissions: string[]): boolean {
		if (this.isAuthenticated() == false) {
			return false;
		}

		if (hasAny(this.principal.getPermissions(), ALL_PERMISSION)) {
			return true;
		}

		for (let i = 0; i < permissions.length; i++) {
			if (hasAny(this.principal.getPermissions(), permissions[i])) {
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
	hasPermissionsAll(permissions: string[]): boolean {
		return this.isAuthenticated() && (hasAny(this.principal.getPermissions(), ALL_PERMISSION) || hasAll(this.principal.getPermissions(), permissions));
	}

}