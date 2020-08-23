<template>
    <div class="Nav-Component">
        <el-row style="width: 100%">
            <el-col :offset="1" :span="23">
                {{title}}
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    computed: {
        title() {
            const bar = this.$store.state.breadcrums.slice(-1)[0] || {};
            const title_header = this.$store.state.locale == 'en' ? bar.En : bar.Zn;
            return title_header || ''
        }
    }
}
</script>
<style lang="scss" scoped>
    .Nav-Component {
        width: 100%;
        margin: 2rem 0;
        height: 2rem;
        border-left: 4px rgb(0, 136, 255) solid;
        font-size: 1.5rem;
        color: rgb(0, 157, 255);
        font-weight: bold;
        vertical-align: center;
    }
</style>