import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly
const enTranslations = {
  "appName": "Calorie Tracker",
  "greeting": {
    "morning": "Good morning",
    "afternoon": "Good afternoon",
    "evening": "Good evening"
  },
  "nav": {
    "dashboard": "Dashboard",
    "search": "Search",
    "progress": "Progress",
    "profile": "Profile"
  },
  "dashboard": {
    "title": "Dashboard",
    "dailyGoal": "Daily Goal",
    "consumed": "Consumed",
    "remaining": "Remaining",
    "calories": "calories",
    "kcal": "kcal",
    "carbs": "Carbs",
    "protein": "Protein",
    "fat": "Fat",
    "g": "g",
    "meals": {
      "breakfast": "Breakfast",
      "lunch": "Lunch",
      "dinner": "Dinner",
      "snack": "Snack",
      "title": "Meals"
    },
    "addFood": "Add Food",
    "noFood": "No food added yet",
    "water": "Water",
    "glasses": "glasses"
  },
  "search": {
    "title": "Search Food",
    "placeholder": "Search for food...",
    "searching": "Searching...",
    "noResults": "No results found",
    "categories": "Categories",
    "allFoods": "All Foods",
    "recent": "Recent",
    "favorites": "Favorites"
  },
  "food": {
    "calories": "Calories",
    "protein": "Protein",
    "carbs": "Carbs",
    "fat": "Fat",
    "perServing": "per serving",
    "servingSize": "Serving Size",
    "addTo": "Add to",
    "quantity": "Quantity",
    "nutritionFacts": "Nutrition Facts",
    "mealType": "Meal Type"
  },
  "progress": {
    "title": "Progress",
    "streak": "Day Streak",
    "days": "days",
    "weeklyOverview": "Weekly Overview",
    "nutritionTrends": "Nutrition Trends",
    "achievements": "Achievements",
    "goalReached": "Goal Reached",
    "daysTracked": "Days Tracked",
    "avgCalories": "Avg. Calories",
    "bestDay": "Best Day"
  },
  "profile": {
    "title": "Profile",
    "name": "Name",
    "goals": "Goals",
    "settings": "Settings",
    "dailyCalorieGoal": "Daily Calorie Goal",
    "dailyProteinGoal": "Daily Protein Goal",
    "dailyCarbsGoal": "Daily Carbs Goal",
    "dailyFatGoal": "Daily Fat Goal",
    "language": "Language",
    "theme": "Theme",
    "light": "Light",
    "dark": "Dark",
    "system": "System",
    "save": "Save",
    "logout": "Logout"
  },
  "mealTypes": {
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "dinner": "Dinner",
    "snack": "Snack"
  },
  "categories": {
    "grain": "Grains",
    "vegetable": "Vegetables",
    "fruit": "Fruits",
    "meat": "Meat",
    "seafood": "Seafood",
    "dairy": "Dairy",
    "egg": "Eggs",
    "snack": "Snacks",
    "beverage": "Beverages",
    "other": "Others"
  },
  "common": {
    "cancel": "Cancel",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "save": "Save",
    "add": "Add",
    "remove": "Remove",
    "back": "Back",
    "next": "Next",
    "done": "Done",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  }
};

const zhTranslations = {
  "appName": "卡路里追踪器",
  "greeting": {
    "morning": "早上好",
    "afternoon": "下午好",
    "evening": "晚上好"
  },
  "nav": {
    "dashboard": "首页",
    "search": "搜索",
    "progress": "进度",
    "profile": "我的"
  },
  "dashboard": {
    "title": "首页",
    "dailyGoal": "每日目标",
    "consumed": "已摄入",
    "remaining": "剩余",
    "calories": "卡路里",
    "kcal": "千卡",
    "carbs": "碳水",
    "protein": "蛋白质",
    "fat": "脂肪",
    "g": "克",
    "meals": {
      "breakfast": "早餐",
      "lunch": "午餐",
      "dinner": "晚餐",
      "snack": "加餐",
      "title": "餐食记录"
    },
    "addFood": "添加食物",
    "noFood": "还没有添加食物",
    "water": "饮水",
    "glasses": "杯"
  },
  "search": {
    "title": "搜索食物",
    "placeholder": "搜索食物...",
    "searching": "搜索中...",
    "noResults": "未找到结果",
    "categories": "分类",
    "allFoods": "全部食物",
    "recent": "最近",
    "favorites": "收藏"
  },
  "food": {
    "calories": "热量",
    "protein": "蛋白质",
    "carbs": "碳水化合物",
    "fat": "脂肪",
    "perServing": "每份",
    "servingSize": "份量",
    "addTo": "添加到",
    "quantity": "数量",
    "nutritionFacts": "营养成分",
    "mealType": "餐食类型"
  },
  "progress": {
    "title": "进度追踪",
    "streak": "连续打卡",
    "days": "天",
    "weeklyOverview": "本周概览",
    "nutritionTrends": "营养趋势",
    "achievements": "成就",
    "goalReached": "目标达成",
    "daysTracked": "记录天数",
    "avgCalories": "平均热量",
    "bestDay": "最佳记录"
  },
  "profile": {
    "title": "个人资料",
    "name": "昵称",
    "goals": "目标设置",
    "settings": "设置",
    "dailyCalorieGoal": "每日热量目标",
    "dailyProteinGoal": "每日蛋白质目标",
    "dailyCarbsGoal": "每日碳水目标",
    "dailyFatGoal": "每日脂肪目标",
    "language": "语言",
    "theme": "主题",
    "light": "浅色",
    "dark": "深色",
    "system": "跟随系统",
    "save": "保存",
    "logout": "退出登录"
  },
  "mealTypes": {
    "breakfast": "早餐",
    "lunch": "午餐",
    "dinner": "晚餐",
    "snack": "加餐"
  },
  "categories": {
    "grain": "谷物",
    "vegetable": "蔬菜",
    "fruit": "水果",
    "meat": "肉类",
    "seafood": "海鲜",
    "dairy": "乳制品",
    "egg": "蛋类",
    "snack": "零食",
    "beverage": "饮品",
    "other": "其他"
  },
  "common": {
    "cancel": "取消",
    "confirm": "确认",
    "delete": "删除",
    "edit": "编辑",
    "save": "保存",
    "add": "添加",
    "remove": "移除",
    "back": "返回",
    "next": "下一步",
    "done": "完成",
    "loading": "加载中...",
    "error": "错误",
    "success": "成功"
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      zh: {
        translation: zhTranslations,
      },
    },
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
