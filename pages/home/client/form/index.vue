<template>
  <div>
    <Nav title="表单管理">
      <template #default>
        <div style="margin-left: 1rem;">
          <el-button type="success">新建表单</el-button>
          <el-button type="primary">表头管理</el-button>
        </div>
      </template>
    </Nav>
    <el-row>
      <el-col :offset="1" :span="13">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :offset="1" :span="8">
        <el-card>
          <el-row>
            <el-col :xl="6" :span="8">
              <el-avatar
                :size="80"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </el-col>
            <el-col :xl="18" :span="16" class="introduce">
              <h4>账号: {{ accountNo }}</h4>
              <h4>姓名: {{ userName }}</h4>
              <h4>身份证: {{ idNo }}</h4>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Nav from '@/components/BaseNav'
export default {
  components: { Nav },
  data() {
      return {
        activeNames: ['1']
      };
  }
}
</script>
