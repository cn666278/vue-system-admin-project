<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <commen-header/>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import CommenHeader from "../components/CommonHeader.vue";
export default defineComponent({
    components: {
        CommenHeader
    }
});
</script>

