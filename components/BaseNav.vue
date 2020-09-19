<template>
    <div class="Nav-Component">
        <el-row style="width: 100%">
            <el-col :offset="1" :span="23" class="flex-center">
                {{title}}
                <slot></slot>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "BaseNav",
    props: {
        title: {
            type: String,
            default() {
                return ""
            }
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
        .flex-center {
            display: flex;
            align-content: center;
            height: 100%;
        }
    }
</style>