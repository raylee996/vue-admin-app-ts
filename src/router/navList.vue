<script>

export default {
    name: "NavList",
    props: {
        routes: {
            type: Array,
            default: []
        }
    },
    render() {
        function renderRoutes(routes) {
            const nodes = routes.map((item, index) => {
                if(!item.children) {
                    return (
                        <el-menu-item index="index" key="index">
                            <router-link slot="title" to="item.path">{item.meta.title}</router-link>
                        </el-menu-item>
                    )
                }else {
                    return (
                        <el-submenu index="index" key="index">
                            <template slot="title">
                                <span slot="title">{item.meta.title}</span>
                            </template>
                            {
                                renderRoutes(item.children)
                            }
                        </el-submenu>
                    )
                }
            });
            return (
                {nodes}
            )
        }
        const nodes = this.routes.map((item, index) => {
            const filterRoutes = item.children.filter(items =>{
                return !items.meta.hidden
            })
            if(filterRoutes.length == 0) {
                return (
                    <el-menu-item index="index" key="index">
                        <i class={'el-icon'+item.icon}></i>
                        <router-link slot="title" to="item.path">{item.meta.title}</router-link>
                    </el-menu-item>
                )
            }else {
                return (
                    <el-submenu index="index" key="index">
                        <template slot="title">
                            <i class={'el-icon'+item.icon}></i>
                            <span slot="title">{item.meta.title}</span>
                        </template>
                        {
                            renderRoutes(filterRoutes)
                        }
                    </el-submenu>
                )
            }
        });
        return (
            {nodes}
        )
    }
}
</script>