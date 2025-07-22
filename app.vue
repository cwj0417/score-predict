<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <div id="header">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">S</span>
          <span class="logo-text">Sport+</span>
        </div>
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <div class="user-info">
          <span class="coins">💰 1234</span>
          <div class="profile">
            <span class="notification">3</span>
            <span class="avatar">👤</span>
            <span class="username">我的<br>账号</span>
          </div>
        </div>
      </div>
      <div class="nav-tabs">
        <NuxtLink to="/" class="nav-tab">首页</NuxtLink>
        <NuxtLink to="/data" class="nav-tab">资料库</NuxtLink>
        <NuxtLink to="/predict" class="nav-tab">预测</NuxtLink>
      </div>
    </div>
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
<style>
:root {
  /* 主题色系 */
  --primary-color: #4CAF50;
  --primary-light: #66BB6A;
  --primary-dark: #388E3C;
  --primary-gradient: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  
  /* 中性色系 */
  --white: #ffffff;
  --black: #000000;
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #eeeeee;
  --gray-300: #e0e0e0;
  --gray-400: #bdbdbd;
  --gray-500: #9e9e9e;
  --gray-600: #757575;
  --gray-700: #616161;
  --gray-800: #424242;
  --gray-900: #212121;
  
  /* 功能色系 */
  --success-color: #4CAF50;
  --warning-color: #FFC107;
  --error-color: #f44336;
  --info-color: #2196F3;
  
  /* 透明度变体 */
  --primary-alpha-10: rgba(76, 175, 80, 0.1);
  --primary-alpha-15: rgba(76, 175, 80, 0.15);
  --primary-alpha-20: rgba(76, 175, 80, 0.2);
  --primary-alpha-30: rgba(76, 175, 80, 0.3);
  --white-alpha-10: rgba(255, 255, 255, 0.1);
  --white-alpha-15: rgba(255, 255, 255, 0.15);
  --white-alpha-20: rgba(255, 255, 255, 0.2);
  --white-alpha-25: rgba(255, 255, 255, 0.25);
  --white-alpha-30: rgba(255, 255, 255, 0.3);
  --black-alpha-10: rgba(0, 0, 0, 0.1);
  --black-alpha-20: rgba(0, 0, 0, 0.2);
  
  /* 字体 */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px var(--black-alpha-10);
  --shadow-md: 0 2px 8px var(--black-alpha-10);
  --shadow-lg: 0 4px 16px var(--black-alpha-20);
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 50%;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  background-color: var(--gray-50);
  color: var(--gray-900);
}

#header {
  background: var(--primary-gradient);
  color: var(--white);
  padding: var(--spacing-sm) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-md);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: bold;
}

.logo-icon {
  background: var(--white);
  color: var(--primary-color);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
}

.search-box {
  background: var(--white-alpha-20);
  border-radius: var(--radius-xl);
  padding: var(--spacing-sm) var(--spacing-lg);
  display: flex;
  align-items: center;
  min-width: 200px;
  backdrop-filter: blur(10px);
}

.search-icon {
  opacity: 0.8;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.coins {
  background: rgba(255, 193, 7, 0.2);
  padding: 6px var(--spacing-md);
  border-radius: var(--spacing-lg);
  font-size: 14px;
  font-weight: 500;
}

.profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  position: relative;
}

.notification {
  background: var(--error-color);
  color: var(--white);
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.avatar {
  font-size: 20px;
}

.username {
  font-size: 14px;
  line-height: 1.2;
}

.nav-tabs {
  display: flex;
  gap: 2px;
}

.nav-tab {
  background: var(--white-alpha-15);
  color: var(--white);
  text-decoration: none;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-tab:hover {
  background: var(--white-alpha-25);
  transform: translateY(-1px);
}

.nav-tab.router-link-active {
  background: var(--white-alpha-30);
  font-weight: 600;
}

@media (max-width: 768px) {
  #header {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .header-left {
    gap: var(--spacing-md);
  }
  
  .search-box {
    min-width: 120px;
  }
  
  .nav-tabs {
    gap: 1px;
  }
  
  .nav-tab {
    padding: 10px var(--spacing-lg);
    font-size: 14px;
  }
  
  .user-info {
    gap: var(--spacing-sm);
  }
  
  .username {
    display: none;
  }
}
</style>