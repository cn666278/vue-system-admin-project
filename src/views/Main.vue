<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <common-aside />
            <el-container class="r-container">
                <common-header/>
                <el-main>
                    <router-view />
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { defineComponent } from "vue-demi";
import CommenHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
export default defineComponent({
    components: {
        CommenHeader,
        CommonAside,
    }
});
</script>

