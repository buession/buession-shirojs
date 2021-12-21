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
