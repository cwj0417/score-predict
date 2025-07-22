<template>
  <div class="team-transfers">
    <!-- 筛选器 -->
    <div class="filter-section">
      <div class="filter-left">
        <span class="filter-label">转会类型：</span>
        <div class="filter-btn" :class="{ active: selectedType === 'all' }" @click="selectType('all')">
          全部
        </div>
        <div class="filter-btn" :class="{ active: selectedType === 'in' }" @click="selectType('in')">
          加盟
        </div>
        <div class="filter-btn" :class="{ active: selectedType === 'out' }" @click="selectType('out')">
          离队
        </div>
      </div>
    </div>

    <!-- 转会记录标题 -->
    <div class="section-title">转会记录</div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      正在加载转会数据...
    </div>

    <!-- 转会列表 -->
    <div v-else class="transfers-list">
      <div v-for="transfer in filteredTransfers" :key="`${transfer.playerId}-${transfer.transferDate}`"
        class="transfer-item">
        <div class="player-info">
          <img v-if="transfer.playerAvatar" :src="transfer.playerAvatar" class="player-avatar"
            :alt="transfer.playerName" />
          <div v-else class="player-avatar-placeholder"></div>

          <div class="player-details">
            <div class="player-name">{{ transfer.playerName }}</div>
            <div class="player-meta">{{ transfer.position || '中场' }} · {{ transfer.age || '25' }}岁</div>
          </div>
        </div>

        <div class="transfer-details">
          <div class="transfer-direction">
            <span class="direction-label">{{ transfer.transferType === 'in' ? '来自' : '前往' }}</span>
            <div class="team-info">
              <img v-if="transfer.teamLogo" :src="transfer.teamLogo" class="team-logo" :alt="transfer.teamName" />
              <span class="team-name">{{ transfer.teamName }}</span>
            </div>
          </div>

          <div class="transfer-fee">
            <div class="fee-label">转会费</div>
            <div class="fee-amount" :class="{ free: transfer.fee === 0 }">
              {{ formatFee(transfer.fee) }}
            </div>
          </div>

          <div class="transfer-date">
            <div class="date-label">日期</div>
            <div class="date-value">{{ formatDate(transfer.transferDate) }}</div>
          </div>

          <div class="transfer-type">
            <div class="type-badge" :class="transfer.transferType">
              {{ transfer.transferType === 'in' ? '加盟' : '离队' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredTransfers.length === 0" class="empty-state">
        暂无转会记录
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <div class="stats-card">
        <div class="stats-number positive">+{{ stats.transfersIn }}</div>
        <div class="stats-label">新加盟</div>
      </div>

      <div class="stats-card">
        <div class="stats-number negative">-{{ stats.transfersOut }}</div>
        <div class="stats-label">离队</div>
      </div>

      <div class="stats-card">
        <div class="stats-number primary">{{ formatMoney(stats.totalSpent) }}</div>
        <div class="stats-label">转会支出</div>
      </div>

      <div class="stats-card">
        <div class="stats-number purple">{{ formatMoney(stats.totalIncome) }}</div>
        <div class="stats-label">转会收入</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  teamInfo: Object,
  honors: Array,
  competitions: Array,
  seasons: Array
})

const route = useRoute()
const teamId = route.params.tid

const transfersData = ref({
  transfersIn: [],
  transfersOut: []
})
const loading = ref(true)
const selectedType = ref('all') // all, in, out
const selectedSeason = ref('2024')

// 计算统计数据
const stats = computed(() => {
  const transfersIn = transfersData.value.transfersIn || []
  const transfersOut = transfersData.value.transfersOut || []

  return {
    transfersIn: transfersIn.length,
    transfersOut: transfersOut.length,
    totalSpent: transfersIn.reduce((sum, t) => sum + (t.fee || 0), 0),
    totalIncome: transfersOut.reduce((sum, t) => sum + (t.fee || 0), 0)
  }
})

// 根据筛选条件过滤转会记录
const filteredTransfers = computed(() => {
  let transfers = []

  if (selectedType.value === 'all') {
    const transfersIn = (transfersData.value.transfersIn || []).map(t => ({ ...t, transferType: 'in' }))
    const transfersOut = (transfersData.value.transfersOut || []).map(t => ({ ...t, transferType: 'out' }))
    transfers = [...transfersIn, ...transfersOut]
  } else if (selectedType.value === 'in') {
    transfers = (transfersData.value.transfersIn || []).map(t => ({ ...t, transferType: 'in' }))
  } else if (selectedType.value === 'out') {
    transfers = (transfersData.value.transfersOut || []).map(t => ({ ...t, transferType: 'out' }))
  }

  // 按日期降序排序
  return transfers.sort((a, b) => new Date(b.transferDate) - new Date(a.transferDate))
})

onMounted(() => {
  fetchTransfers()
})

function selectType(type) {
  selectedType.value = type
}

async function fetchTransfers() {
  try {
    loading.value = true
    const response = await $fetch(`/sport/api/v3/team/${teamId}/transfers`)

    if (response && response.result) {
      transfersData.value = response.result
    } else {
      // 使用模拟数据
      transfersData.value = {
        transfersIn: [
          {
            fee: 40000000, // 4000万欧
            playerAvatar: '',
            playerId: 1,
            playerName: '卡里姆·阿卜杜勒-贾瓦德',
            position: '中场',
            age: 25,
            remark: '',
            teamId: 123,
            teamLogo: '',
            teamName: '阿拉伯建筑',
            transferDate: '2024-07-15',
            transferType: 'in'
          },
          {
            fee: 30000000, // 3000万欧
            playerAvatar: '',
            playerId: 2,
            playerName: '阿里·马阿洛夫',
            position: '后卫',
            age: 28,
            remark: '',
            teamId: 456,
            teamLogo: '',
            teamName: '赫尔辛基',
            transferDate: '2024-06-20',
            transferType: 'in'
          },
          {
            fee: 0, // 免费
            playerAvatar: '',
            playerId: 3,
            playerName: '穆罕默德·哈尼',
            position: '后卫',
            age: 31,
            remark: '',
            teamId: 789,
            teamLogo: '',
            teamName: '自由转会',
            transferDate: '2024-07-01',
            transferType: 'in'
          }
        ],
        transfersOut: [
          {
            fee: 20000000, // 2000万欧
            playerAvatar: '',
            playerId: 4,
            playerName: '艾哈迈德·阿布德勒拉塔夫',
            position: '前锋',
            age: 29,
            remark: '',
            teamId: 321,
            teamLogo: '',
            teamName: '扎马雷克',
            transferDate: '2024-07-08',
            transferType: 'out'
          },
          {
            fee: 15000000, // 1500万欧
            playerAvatar: '',
            playerId: 5,
            playerName: '优素福·阿曼',
            position: '后卫',
            age: 25,
            remark: '',
            teamId: 654,
            teamLogo: '',
            teamName: '开罗国际',
            transferDate: '2024-06-26',
            transferType: 'out'
          }
        ]
      }
    }
  } catch (error) {
    console.error('获取转会数据失败:', error)
    transfersData.value = {
      transfersIn: [],
      transfersOut: []
    }
  } finally {
    loading.value = false
  }
}

// 格式化转会费
function formatFee(fee) {
  if (!fee || fee === 0) return '免费'
  if (fee >= 10000) return `${(fee / 10000).toFixed(0)}万欧`
  return `${fee}欧`
}

// 格式化金额
function formatMoney(amount) {
  if (!amount || amount === 0) return '0万欧'
  return `${(amount / 10000).toFixed(0)}万欧`
}

// 格式化日期
function formatDate(dateStr) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}
</script>
<style scoped>
.team-transfers {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.filter-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #eee;
}

.filter-btn.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.season-label {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.season-select {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  min-width: 120px;
}

.season-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 8px 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #999;
  font-size: 16px;
}

.transfers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transfer-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.transfer-item:hover {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
}

.player-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 250px;
}

.player-avatar,
.player-avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f0f0f0;
  object-fit: cover;
}

.player-details {
  flex: 1;
}

.player-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.player-meta {
  font-size: 13px;
  color: #888;
}

.transfer-details {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
  justify-content: flex-end;
}

.transfer-direction {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.direction-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.team-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.team-logo {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: cover;
}

.team-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.transfer-fee {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.fee-label,
.date-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.fee-amount {
  font-size: 14px;
  font-weight: 600;
  color: #34a853;
}

.fee-amount.free {
  color: #888;
}

.transfer-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.date-value {
  font-size: 13px;
  color: #666;
}

.transfer-type {
  min-width: 60px;
  display: flex;
  justify-content: center;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.type-badge.in {
  background: #e8f5e8;
  color: #34a853;
}

.type-badge.out {
  background: #ffeaa7;
  color: #e17055;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: #999;
  font-size: 14px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stats-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
}

.stats-number {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stats-number.positive {
  color: #34a853;
}

.stats-number.negative {
  color: #ea4335;
}

.stats-number.primary {
  color: #4285f4;
}

.stats-number.purple {
  color: #9c27b0;
}

.stats-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .transfer-details {
    gap: 24px;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 16px;
  }

  .filter-left {
    justify-content: center;
  }

  .transfer-item {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 16px;
  }

  .player-info {
    min-width: auto;
  }

  .transfer-details {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .transfer-direction,
  .transfer-fee,
  .transfer-date,
  .transfer-type {
    min-width: auto;
    align-items: stretch;
  }

  .team-info {
    justify-content: center;
  }

  .stats-section {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stats-card {
    padding: 16px;
  }

  .stats-number {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .filter-left {
    flex-wrap: wrap;
  }

  .filter-btn {
    flex: 1;
    text-align: center;
    min-width: 60px;
  }
}
</style>
