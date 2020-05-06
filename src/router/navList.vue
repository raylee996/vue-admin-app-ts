<script>

export default {
    name: "NavList",
    props: {
        routes: {
            type: Array,
            default: []
        },
        asideStatusHidding: {
            type: Boolean
        }
    },
    render() {
        function renderRoutes(parentIndex, routes) {
            const nodes = routes.map((item, index) => {
                if(!item.children) {
                    return (
                        <el-menu-item index={parentIndex + "-" + index} key={parentIndex + "-" + index}>
                            <router-link slot="title" to={item.path}>{item.meta.title}</router-link>
                        </el-menu-item>
                    )
                }else {
                    const filterRoutes = item.children.filter(items =>{
                        return !items.meta.hidden
                    })
                    if(filterRoutes.length == 0) {
                        return (
                            <el-menu-item index={parentIndex + "-" + index} key={parentIndex + "-" + index}>
                                <router-link slot="title" to={item.path}>{item.meta.title}</router-link>
                            </el-menu-item>
                        )
                    }else {
                        return (
                            <el-submenu index={parentIndex + "-" + index} key={parentIndex + "-" + index}>
                                <template slot="title">
                                    <span slot="title">{item.meta.title}</span>
                                </template>
                                {
                                    renderRoutes(parentIndex + "-" + index, filterRoutes)
                                }
                            </el-submenu>
                        )
                    }
                }
            });
            return (
                <div>{nodes}</div>
            )
        }
        const nodes = this.routes.map((item, index) => {
            const filterRoutes = item.children.filter(items =>{
                return !items.meta.hidden
            })
            if(filterRoutes.length == 0) {
                return (
                    <el-menu-item index={index+""} key={index+""}>
                        <i class={'el-icon-'+item.meta.icon}></i>
                        <router-link slot="title" to={item.path}>{item.meta.title}</router-link>
                    </el-menu-item>
                )
            }else {
                return (
                    <el-submenu index={index+""} key={index+""}>
                        <template slot="title">
                            <i class={'el-icon-'+item.meta.icon}></i>
                            <span slot="title">{item.meta.title}</span>
                        </template>
                        {
                            renderRoutes(index, filterRoutes)
                        }
                    </el-submenu>
                )
            }
        });
        return (
            <el-menu collapse={this.asideStatusHidding} unique-opened={true}>
                {nodes}
            </el-menu>
        )
    }
}
</script>

<style lang="less">
.el-menu{
    height: 100%;
    background-color: rgb(48, 65, 86);
    li{
        a, span{
            color: #ccc;
        }
    }
}
</style>