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
	setId(id:string): void,

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
	setRoles(roleNames:string[]): void,

	/**
     * 添加用户角色
	 *
	 * @param roleName
	 * 		用户角色名称
	 */
	addRole(roleName:string): void,

	/**
     * 批量添加用户角色
	 *
	 * @param roleNames
	 * 		用户角色名称列表
	 */
	addRoles(roleNames:string[]): void,

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
	setPermissions(permissions:string[]): void,

	/**
     * 添加用户权限
	 *
	 * @param permission
	 * 		用户权限
	 */
	addPermission(permission:string): void,

	/**
     * 批量添加用户权限
	 *
	 * @param permissions
	 * 		用户权限列表
	 */
	addPermissions(permissions:string[]): void
}

export interface Shiro {
	
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
	hasRole(roleName:string): boolean;

	/**
	 * 验证用户是否不具备某角色，与 hasRole 逻辑相反
	 *
	 * @param roleName
	 * 		角色名称
	 *
	 * @return 用户是否不具备某角色
	 */
	lacksRole(roleName:string): boolean;

	/**
	 * 验证用户是否具有以下任意一个角色
	 *
	 * @param roleNames
	 * 		角色列表
	 *
	 * @return 用户是否具有以下任意一个角色
	 */
	hasAnyRole(roleNames:string[]): boolean;

	/**
	 * 验证用户是否具有以下所有角色。
	 *
	 * @param roleNames
	 * 		角色列表
	 *
	 * @return 用户是否具有以下所有角色
	 */
	hasRolesAll(roleNames:string[]): boolean;

	/**
	 * 验证用户是否具备某权限
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否具备某权限
	 */
	hasPermission(permission:string): boolean;

	/**
	 * 验证用户是否不具备某权限，与 hasPermission 逻辑相反
	 *
	 * @param permission
	 * 		权限名称
	 *
	 * @return 用户是否不具备某权限
	 */
	lacksPermission(permission:string): boolean;

	/**
	 * 验证用户是否具有以下任意一个权限
	 *
	 * @param permissions
	 * 		权限列表
	 *
	 * @return 用户是否具有以下任意一个权限
	 */
	hasAnyPermission(permissions:string[]): boolean;

	/**
	 * 验证用户是否具有以下所有权限
	 *
	 * @param permissions
	 * 		权限列表
	 *
	 * @return 用户是否具有以下所有权限
	 */
	hasPermissionsAll(permissions:string[]): boolean;

}