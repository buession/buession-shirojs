import { isUndefinedOrNull } from '../utils/common';

export interface PrincipalPlainObject {

	/**
	 * 用户 ID
	 */
	id: string;

	/**
	 * 用户角色名称列表
	 */
	roles: string[];

	/**
	 * 用户权限列表
	 */
	permissions: string[];

}

export interface Principal {

	/**
	 * 返回用户 ID
	 * 
	 * @return 用户 ID
	 */
	getId(): string,

	/**
     * 设置用户 ID
	 *
	 * @param id
	 * 		用户 ID
	 */
	setId(id: string): void,

	/**
	 * 返回用户角色名称列表
	 * 
	 * @return 用户角色名称列表
	 */
	getRoles(): string[],

	/**
     * 设置用户角色
	 *
	 * @param roleNames
	 * 		用户角色名称列表
	 */
	setRoles(roleNames: string[]): void,

	/**
     * 添加用户角色
	 *
	 * @param roleName
	 * 		用户角色名称
	 */
	addRole(roleName: string): void,

	/**
     * 批量添加用户角色
	 *
	 * @param roleNames
	 * 		用户角色名称列表
	 */
	addRoles(roleNames: string[]): void,

	/**
	 * 返回用户权限列表
	 * 
	 * @return 用户权限列表
	*/
	getPermissions(): string[],

	/**
     * 设置用户权限
	 *
	 * @param permissions
	 * 		用户权限列表
	 */
	setPermissions(permissions: string[]): void,

	/**
     * 添加用户权限
	 *
	 * @param permission
	 * 		用户权限
	 */
	addPermission(permission: string): void,

	/**
     * 批量添加用户权限
	 *
	 * @param permissions
	 * 		用户权限列表
	 */
	addPermissions(permissions: string[]): void
}

export class DefaultPrincipal implements Principal {

  private id: string;

  private roles: string[];

  private permissions: string[];

  public constructor (id: string, roles: string[], permissions: string[]) {
    this.id = id;
		this.roles = roles;
		this.permissions = permissions;
  }

  public getId (): string {
    return this.id;
  }

  public setId (id: string): void {
    this.id = id;
  }

  public getRoles (): string[] {
    return this.roles;
  }

  public setRoles (roleNames: string[]): void {
    this.roles = isUndefinedOrNull(roleNames) === true ? [] : roleNames;
  }

  public addRole (roleName: string): void {
    this.roles.push(roleName);
  }

  public addRoles (roleNames: string[]): void {
    if (isUndefinedOrNull(roleNames) === false) {
			this.roles = this.roles.concat(roleNames);
    }
  }

  public getPermissions (): string[] {
    return this.permissions;
  }

  public setPermissions (permissions: string[]): void {
    this.permissions = isUndefinedOrNull(permissions) === true ? [] : permissions;
  }

  public addPermission (permission: string): void {
    this.permissions.push(permission);
  }

  public addPermissions (permissions: string[]): void {
    if (isUndefinedOrNull(permissions) === false) {
			this.permissions = this.roles.concat(permissions);
    }
  }

}
