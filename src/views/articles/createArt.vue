<template>
  <page-view>
    <a-card :bordered="false">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-input
            addonBefore="标题"
            v-decorator="['title', { rules: [{ required: true, message: '请输入文章标题' }] }]"
            placeholder="请输入文章标题"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-input
            addonBefore="作者"
            v-decorator="['author', { rules: [{ required: true, message: '请输入文章作者' }],initialValue: 'Mrxh' }]"
            placeholder="请输入文章作者"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-input
            addonBefore="关键字"
            v-decorator="['keywords', { rules: [{ required: true, message: '请输入文章关键字' }] }]"
            placeholder="请输入文章关键字"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-input
            addonBefore=" 描述"
            v-decorator="['intro', { rules: [{ required: true, message: '请输入文章描述' }] }]"
            placeholder="请输入文章描述"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-input
            addonBefore="封面链接"
            v-decorator="['cover', { rules: [{ required: true, message: '请输入文章封面链接' }] }]"
            placeholder="请输入文章封面链接"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 1 }" :wrapper-col="{ span: 23 }" label="文章类型：">
          <a-select style="width: 120px" v-model="forms.arttype">
            <a-select-option value="blog">博文</a-select-option>
            <a-select-option value="note">随记</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="{ span: 1 }" :wrapper-col="{ span: 23 }" label="是否上线：">
          <a-switch v-decorator="['isRaise', { valuePropName: 'checked',initialValue: true }]" />
        </a-form-item>
        <a-form-item :label-col="{ span: 1 }" :wrapper-col="{ span: 23 }" label="是否推荐：">
          <a-switch v-decorator="['isRecommend', { valuePropName: 'checked' }]" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <tags @tagChange="getTags"/>
        </a-form-item>
        <a-form-item >
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-form-item>
        <a-form-item >
          <mavon-editor
            ref="md"
            @imgAdd="$imgAdd"
            @change="handleChange"
            v-model="forms.content"
            :preview="true"
            class="markdown"/>
          <a-input
            type="hidden"
            v-decorator="['content', { rules: [{ required: true, message: '请输入文章内容' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import Tags from '@/components/Tags'
import { createArt } from '@/api/articles'

export default {
  name: 'CreateArt',
  components: {
    PageView,
    Tags
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      forms: {
        content: '',
        scontent: '',
        tags: '',
        arttype: 'blog'
      }
    }
  },
  methods: {
    handleChange (e) {
      const self = this
      self.form.setFieldsValue({
        content: e
      })
    },
    getTags (data) {
      this.forms.tags = data.join(',')
    },
    handleSubmit (e) {
      const self = this
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = Object.assign(values, self.forms)
          createArt(data).then(res => {
            if (res.code === 0) {
              self.$notification.open({
                message: '提示',
                description: '文章创建成功',
                icon: <a-icon type="smile" style="color: #108ee9" />
              })
              self.handleReset()
            }
          }).catch(err => {
            self.$notification.open({
              message: '提示',
              description: String(err),
              icon: <a-icon type="error" style="color: #ff0000" />
            })
          })
        }
      })
    },
    handleReset () {
      this.form.resetFields()
      this.forms.content = ''
      this.forms.scontent = ''
      this.forms.tags = ''
      this.forms.arttype = 'blog'
    },
    $imgAdd (pos, $file) {
      const self = this
      self.forms.scontent = self.forms.content
      self.forms.scontent = self.forms.scontent.replace(/!\[.*\].*\)/g, `![${pos}.png](${$file.miniurl})`)
      self.form.setFieldsValue({
        content: self.forms.scontent
      })
    }
  }

}
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .markdown{
    position: relative;
    z-index: 0;
  }
</style>
