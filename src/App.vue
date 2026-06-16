<!-- ============================================================
     用户个人资料组件 (App.vue)
     功能：提供用户个人信息展示与编辑功能
     - display-view：只读模式，展示用户信息
     - edit-view：编辑模式，允许修改用户信息并保存
     ============================================================ -->
<template>
    <!-- 显示模式：只读展示用户信息，isEditmode 为 false 时可见 -->
    <div v-show="!isEditmode" >
        <h1>User profile</h1> 
        <!-- 用户头像 -->
        <img :src="image">
        <span>Name:  </span><b id="name">{{ name }}</b>
        <hr />

        <span>Email:  </span><b id="email">{{ email }}</b>
        <hr />

        <span>Interests:  </span><b id="interests">{{ interests }}</b>
        <hr />

        <!-- 点击切换至编辑模式 -->
        <button @click="handleEditProfile()">Edit Profile</button>
    </div>
    <!-- 编辑模式：允许修改用户信息，isEditmode 为 true 时可见 -->
    <div v-show="isEditmode">
        <h1>User profile</h1>
        <img :src="image">
        <span>Name:  </span>
        <!-- 姓名输入框，双向绑定 name 数据 -->
        <input type="text" id="input-name" v-model="name"/>
        <hr />

        <span>Email:  </span>
        <!-- 邮箱输入框，双向绑定 email 数据 -->
        <input type="text" id="input-email" v-model="email"/>
        <hr />

        <span>Interests:  </span>
        <!-- 兴趣输入框，双向绑定 interests 数据 -->
        <input type="text" id="input-interests" v-model="interests"/>  
        <hr />

        <!-- 点击保存更新并返回显示模式 -->
        <button @click="handleUpdateProfile()">Update Profile</button>  
    </div>
</template>

<script>
// 导入用户头像图片资源
import image from "./profile.jpeg"

export default {
    name: 'App',
    // 组件数据模型
    data() {
        return {
            image: image,              // 用户头像
            name: "",        // 用户姓名
            email: "",  // 用户邮箱
            interests: "",       // 用户兴趣
            isEditmode: false          // 是否处于编辑模式（false=显示模式，true=编辑模式）
        }
    },
    // 组件方法

    async created() {
        // 组件创建时自动调用，模拟从服务器获取用户资料数据
        const userData = await this.fetchUserProfile();
        this.name = userData.name;
        this.email = userData.email;
        this.interests = userData.interests;
    },
    
    methods:{
        /**
         * handleEditProfile - 编辑按钮点击事件
         * 将视图从显示模式切换到编辑模式
         */
        handleEditProfile() {
            this.isEditmode = true;
        },
        /**
         * handleUpdateProfile - 更新按钮点击事件
         * 将视图从编辑模式切回显示模式，完成资料更新
         */
        async handleUpdateProfile() {
            const payload = {
                name: this.name,
                email: this.email,
                interests: this.interests
            }
            const resJson = await this.updateUserProfile(payload);
            console.log(resJson);
            this.isEditmode = false;
        },

        async fetchUserProfile() {
            // 模拟从服务器获取用户资料数据
            const res = await fetch('get-profile');
            return await res.json();
        },

        async updateUserProfile(payload) {
            // 模拟向服务器发送更新后的用户资料数据
            const res = await fetch('update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            })
            return await res.json();
        }
    }
}
</script>
<style>
/* 用户头像样式：固定宽高并居中显示 */
img {
    width: 320px;
    height: 270px;
    display: block;
    margin-bottom: 40px;
}

/* 视图容器样式：居中布局 */
div {
    margin: 40px auto;
    width: 80%;
}

/* 分隔线样式 */
hr{
   width: 400px;
   margin: 25px 0;
}

/* 按钮通用样式 */
button{
    width: 160px;
    font-size: 15px;
    height: 45px;
    border-radius: 5px;
}

/* 按钮悬停效果：鼠标变为手型 */
button:hover {
    cursor: pointer;
}

/* 输入框通用样式 */
input{
    width: 200px;
    height: 15px;
    padding: 10px;
}
</style>
