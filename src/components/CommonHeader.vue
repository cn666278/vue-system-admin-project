<template>
    <el-header>
        <div class="left-content">
            <el-button size="small">
                <el-icon size="20">
                    <Menu />
                </el-icon>
            </el-button>
        </div>
        <div class="right-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="userImg" src="../assets/images/user.png" alt="">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Personal</el-dropdown-item>
                        <el-dropdown-item>Exit</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>

</template>

<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .right-content .userImg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>