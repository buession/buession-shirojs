==============

使用方法：

	一、shiro.isAuthenticated()
		功能说明：验证是否为已认证通过的用户，不包含已记住的用户，这是与 isUser 标签方法的区别所在。
		参数：无
		返回值：boolean

	二、shiro.isNotAuthenticated()
		功能说明：验证是否为未认证通过用户，与 isAuthenticated 标签相对应，与 isGuest 标签的区别是，该标签包含已记住用户。
		参数：无
		返回值：boolean

	三、shiro.isGuest()
		功能说明：验证当前用户是否为“访客”，即未认证（包含未记住）的用户。
		参数：无
		返回值：boolean

	四、shiro.isUser()
		功能说明：验证当前用户是否认证通过或已记住的用户。
		参数：无
		返回值：boolean

	五、shiro.hasRole(roleName:string)
		功能说明：验证当前用户是否属于该角色 。
		参数：string roleName 角色名称
		返回值：boolean

	六、shiro.lacksRole(roleName:string)
		功能说明：验证当前用户是否不属于该角色，与 hasRole 标签逻辑相反。
		参数：string roleName 角色名称
		返回值：boolean

	七、shiro.hasAnyRoles(roleNames:string[])
		功能说明：验证当前用户是否属于以下任意一个角色。
		参数：string roleNames 用户角色列表
		返回值：boolean

	八、shiro.hasRolesAll(roleNames:string[])
		功能说明：证用户是否具有以下所有角色。
		参数：string roleNames 用户角色列表
		返回值：boolean

	九、shiro.hasPermission(permission:string)
		功能说明：验证当前用户是否拥有指定权限。
		参数：string permission 权限名称
		返回值：boolean

	十、shiro.lacksPermission(permission:string)
		功能说明：验证当前用户是否不拥有指定权限，与 hasPermission 逻辑相反。
		参数：string permission 权限名称
		返回值：boolean

	十一、shiro.hasAnyPermission(permissions:string[])
		功能说明：验证用户是否具有以下任意一个权限。
		参数：string permissions 权限名称列表
		返回值：boolean

	十二、shiro.hasPermissionsAll(permissions:string[])
		功能说明：验证用户是否具有以下所有权限。
		参数：string permissions 权限名称列表
		返回值：boolean

=======
