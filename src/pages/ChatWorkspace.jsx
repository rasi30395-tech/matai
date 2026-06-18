import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { 
  MessageSquare, Compass, HelpCircle, History, Bookmark, Award, 
  BarChart2, BookOpen, Layers, Settings, Plus, ChevronDown, ChevronRight, 
  Check, ArrowRight, Activity, Flame, Zap, AlertCircle, Shield, Trash2, 
  Play, Pause, Download, Sparkles, TrendingUp, Sliders, Search, User, 
  Bell, Lock, Database, Copy, RotateCcw, Maximize2, Volume2, Globe, EyeOff,
  Info, FileText, Dumbbell, Languages, Menu, PanelRight, X, Mic, Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// TRANSLATION SYSTEM — 12 Languages
// ============================================================
const translations = {
  en: { newChat:'New Chat', chat:'Chat', explore:'Explore', problems:'Problems', history:'History', bookmarks:'Bookmarks', achievements:'Achievements', analytics:'Analytics', practice:'Practice', formulaSheet:'Formula Sheet', settings:'Settings', quickAccess:'Quick Access', toolsToolkit:'Tools Toolkit', upgradePro:'Upgrade to Pro', solve:'Solve', send:'Send', searchTopics:'Search trending math topics...', searchProblems:'Search problems library...', searchHistory:'Search history sessions...', searchBookmarks:'Search bookmarks...', trendingTopics:'Trending Math Topics', popularProblems:'Popular Problems', learningPaths:'Learning Paths', trySolving:'Try solving', solveProblem:'Solve Problem', reopen:'Reopen', load:'Load', appearance:'Appearance', themeColors:'Theme Colors', fontSize:'Font Size', language:'Language', mathSettings:'Math Settings', aiSettings:'AI Settings', cacheData:'Cache & Data', dangerZone:'Danger Zone', clearCache:'Clear All Cache', clearChats:'Clear All Chats', katex:'KaTeX Rendering', showSteps:'Show Steps', autoSimplify:'Auto Simplify', angleUnit:'Angle Unit', aiModel:'AI Model', responseLen:'Response Length', temperature:'Temperature', light:'Light', dark:'Dark', system:'System', small:'Small', medium:'Medium', large:'Large', solutionSummary:'Solution Summary', videoPlayer:'Video Player', visualization:'Visualization', notes:'Notes', online:'ONLINE', compiling:'COMPILING', chatView:'CHAT VIEW', mathEngine:'Mathematics Assistant Engine', askPlaceholder:'Ask a math problem or describe a chart to plot...', noSolution:'No active solution computed. Submit a calculation.', noGraph:'No active graph. Submit a query.', overview:'Overview', stepByStep:'Step-by-Step Solution', finalAnswer:'Final Answer', saveBookmark:'Save to Bookmarks', relatedConcepts:'Related Concepts', practiceTitle:'Practice Problems', selectTopic:'Select Topic', selectDifficulty:'Select Difficulty', generateQuestion:'Generate Question', checkAnswer:'Check Answer', yourAnswer:'Your answer...', correct:'Correct! Well done!', incorrect:'Incorrect. Try again.', formulaSheetTitle:'Formula Reference Sheet', algebra:'Algebra', trigonometry:'Trigonometry', calculus:'Calculus', statistics:'Statistics', linearAlgebra:'Linear Algebra', rank:'RANK', level:'LEVEL', streak:'STREAK', sort:'Sort', newest:'Newest', oldest:'Oldest', all:'All', basic:'Basic', intermediate:'Intermediate', advanced:'Advanced', solutions:'Solutions', graphs:'Graphs', videos:'Videos', explanations:'Explanations', pinned:'PINNED', problemsSolved:'Problems Solved', activeStreak:'Active Streak', graphsPlotted:'Graphs Plotted', videosWatched:'Videos Watched', unlockedBadges:'Unlocked Badges', solvingAccuracy:'Solving Accuracy', topicCoverage:'Topic Coverage', studyDuration:'Learning Session Duration', weeklyActivity:'Weekly contribution activity', topicMetrics:'Topic Accuracy Metrics', lessActive:'Less active', moreActive:'More active', cacheCleared:'All cache and temporary data cleared successfully!', confirmClear:'Are you sure? This will clear all cached data, temporary storage, and reset application state.' },
  ta: { newChat:'புதிய அரட்டை', chat:'அரட்டை', explore:'ஆராய்', problems:'கணக்குகள்', history:'வரலாறு', bookmarks:'புக்மார்க்', achievements:'சாதனைகள்', analytics:'பகுப்பாய்வு', practice:'பயிற்சி', formulaSheet:'சூத்திரத் தாள்', settings:'அமைப்புகள்', quickAccess:'விரைவு அணுகல்', solve:'தீர்', send:'அனுப்பு', searchTopics:'கணித தலைப்புகளை தேடு...', searchProblems:'கணக்கு நூலகத்தில் தேடு...', searchHistory:'வரலாற்றை தேடு...', searchBookmarks:'புக்மார்க்கை தேடு...', trendingTopics:'பிரபல கணித தலைப்புகள்', popularProblems:'பிரபல கணக்குகள்', learningPaths:'கற்றல் பாதைகள்', trySolving:'தீர்க்க முயற்சிக்க', solveProblem:'கணக்கை தீர்', reopen:'மீண்டும் திற', load:'ஏற்று', appearance:'தோற்றம்', themeColors:'தீம் நிறங்கள்', fontSize:'எழுத்துரு அளவு', language:'மொழி', mathSettings:'கணித அமைப்புகள்', aiSettings:'AI அமைப்புகள்', cacheData:'தற்காலிக சேமிப்பு', dangerZone:'ஆபத்து மண்டலம்', clearCache:'அனைத்தையும் அழி', clearChats:'அரட்டைகளை அழி', katex:'KaTeX ரெண்டரிங்', showSteps:'படிகளைக் காட்டு', autoSimplify:'தானியங்கி எளிமை', angleUnit:'கோண அலகு', aiModel:'AI மாடல்', responseLen:'பதில் நீளம்', temperature:'வெப்பநிலை', light:'ஒளி', dark:'இருள்', system:'கணினி', small:'சிறிய', medium:'நடுத்தர', large:'பெரிய', solutionSummary:'தீர்வு சுருக்கம்', videoPlayer:'வீடியோ', visualization:'காட்சிப்படுத்தல்', notes:'குறிப்புகள்', online:'ஆன்லைன்', compiling:'தொகுத்தல்', chatView:'அரட்டை பார்வை', mathEngine:'கணித உதவி இயந்திரம்', askPlaceholder:'ஒரு கணித கணக்கைக் கேளுங்கள்...', noSolution:'தீர்வு இல்லை. கணக்கை சமர்ப்பிக்கவும்.', noGraph:'வரைபடம் இல்லை.', overview:'கண்ணோட்டம்', stepByStep:'படிப்படியான தீர்வு', finalAnswer:'இறுதி பதில்', saveBookmark:'புக்மார்க் செய்', relatedConcepts:'தொடர்புடைய கருத்துகள்', practiceTitle:'பயிற்சி கணக்குகள்', selectTopic:'தலைப்பை தேர்', selectDifficulty:'கடினத்தை தேர்', generateQuestion:'கேள்வி உருவாக்கு', checkAnswer:'பதிலை சோதி', yourAnswer:'உங்கள் பதில்...', correct:'சரி! நன்று!', incorrect:'தவறு. மீண்டும் முயற்சிக்கவும்.', formulaSheetTitle:'சூத்திர குறிப்புத் தாள்', algebra:'இயற்கணிதம்', trigonometry:'முக்கோணவியல்', calculus:'நுண்கணிதம்', statistics:'புள்ளியியல்', linearAlgebra:'நேரியல் இயற்கணிதம்', rank:'தரம்', level:'நிலை', streak:'தொடர்', sort:'வரிசை', newest:'புதியது', oldest:'பழையது', all:'அனைத்தும்', basic:'அடிப்படை', intermediate:'இடைநிலை', advanced:'மேம்பட்ட', solutions:'தீர்வுகள்', graphs:'வரைபடங்கள்', videos:'வீடியோக்கள்', explanations:'விளக்கங்கள்', pinned:'பொருத்தப்பட்ட', problemsSolved:'தீர்க்கப்பட்டது', activeStreak:'செயல் தொடர்', graphsPlotted:'வரையப்பட்டது', videosWatched:'பார்க்கப்பட்டது', unlockedBadges:'திறக்கப்பட்ட பேட்ஜ்கள்', solvingAccuracy:'தீர்வு துல்லியம்', topicCoverage:'தலைப்பு கவரேஜ்', studyDuration:'கற்றல் கால அளவு', weeklyActivity:'வாராந்திர செயல்பாடு', topicMetrics:'துல்லியம் அளவீடுகள்', lessActive:'குறைவான செயல்', moreActive:'அதிக செயல்', cacheCleared:'தற்காலிக சேமிப்பு அழிக்கப்பட்டது!', confirmClear:'உறுதியா? அனைத்து தரவும் அழிக்கப்படும்.' },
  hi: { newChat:'नई चैट', chat:'चैट', explore:'खोजें', problems:'समस्याएं', history:'इतिहास', bookmarks:'बुकमार्क', achievements:'उपलब्धियां', analytics:'विश्लेषण', practice:'अभ्यास', formulaSheet:'सूत्र पत्र', settings:'सेटिंग्स', quickAccess:'त्वरित पहुंच', solve:'हल करें', send:'भेजें', searchTopics:'गणित विषय खोजें...', searchProblems:'समस्या पुस्तकालय खोजें...', searchHistory:'इतिहास खोजें...', searchBookmarks:'बुकमार्क खोजें...', trendingTopics:'लोकप्रिय गणित विषय', popularProblems:'लोकप्रिय समस्याएं', learningPaths:'सीखने के रास्ते', trySolving:'हल करने की कोशिश', solveProblem:'समस्या हल करें', reopen:'फिर से खोलें', load:'लोड', appearance:'दिखावट', themeColors:'थीम रंग', fontSize:'फ़ॉन्ट आकार', language:'भाषा', mathSettings:'गणित सेटिंग्स', aiSettings:'AI सेटिंग्स', cacheData:'कैश और डेटा', dangerZone:'खतरा क्षेत्र', clearCache:'सभी कैश साफ़ करें', clearChats:'सभी चैट साफ़ करें', katex:'KaTeX रेंडरिंग', showSteps:'चरण दिखाएं', autoSimplify:'ऑटो सरलीकरण', angleUnit:'कोण इकाई', aiModel:'AI मॉडल', responseLen:'प्रतिक्रिया लंबाई', temperature:'तापमान', light:'लाइट', dark:'डार्क', system:'सिस्टम', small:'छोटा', medium:'मध्यम', large:'बड़ा', solutionSummary:'समाधान सारांश', videoPlayer:'वीडियो', visualization:'विज़ुअलाइज़ेशन', notes:'नोट्स', online:'ऑनलाइन', compiling:'संकलन', chatView:'चैट दृश्य', mathEngine:'गणित सहायक इंजन', askPlaceholder:'एक गणित समस्या पूछें...', noSolution:'कोई समाधान नहीं। गणना सबमिट करें।', noGraph:'कोई ग्राफ नहीं।', overview:'अवलोकन', stepByStep:'चरणबद्ध समाधान', finalAnswer:'अंतिम उत्तर', saveBookmark:'बुकमार्क करें', relatedConcepts:'संबंधित अवधारणाएं', practiceTitle:'अभ्यास समस्याएं', selectTopic:'विषय चुनें', selectDifficulty:'कठिनाई चुनें', generateQuestion:'प्रश्न उत्पन्न करें', checkAnswer:'उत्तर जांचें', yourAnswer:'आपका उत्तर...', correct:'सही! शाबाश!', incorrect:'गलत। पुनः प्रयास करें।', formulaSheetTitle:'सूत्र संदर्भ पत्र', algebra:'बीजगणित', trigonometry:'त्रिकोणमिति', calculus:'कलन', statistics:'सांख्यिकी', linearAlgebra:'रैखिक बीजगणित', rank:'रैंक', level:'स्तर', streak:'स्ट्रीक', sort:'क्रमबद्ध', newest:'नवीनतम', oldest:'पुराना', all:'सभी', basic:'बुनियादी', intermediate:'मध्यवर्ती', advanced:'उन्नत', solutions:'समाधान', graphs:'ग्राफ', videos:'वीडियो', explanations:'स्पष्टीकरण', pinned:'पिन किया', problemsSolved:'हल की गई समस्याएं', activeStreak:'सक्रिय स्ट्रीक', graphsPlotted:'प्लॉट किए गए', videosWatched:'देखे गए', unlockedBadges:'अनलॉक बैज', solvingAccuracy:'समाधान सटीकता', topicCoverage:'विषय कवरेज', studyDuration:'अध्ययन अवधि', weeklyActivity:'साप्ताहिक गतिविधि', topicMetrics:'विषय सटीकता', lessActive:'कम सक्रिय', moreActive:'अधिक सक्रिय', cacheCleared:'कैश साफ़ हो गया!', confirmClear:'क्या आप सुनिश्चित हैं? सभी डेटा साफ़ हो जाएगा।' },
  te: { newChat:'కొత్త చాట్', chat:'చాట్', explore:'అన్వేషించు', problems:'సమస్యలు', history:'చరిత్ర', bookmarks:'బుక్‌మార్క్', achievements:'సాధనలు', analytics:'విశ్లేషణ', practice:'సాధన', formulaSheet:'సూత్ర పత్రం', settings:'సెట్టింగ్‌లు', quickAccess:'త్వరిత ప్రవేశం', solve:'పరిష్కరించు', send:'పంపు', appearance:'రూపం', themeColors:'థీమ్ రంగులు', fontSize:'ఫాంట్ పరిమాణం', language:'భాష', mathSettings:'గణిత సెట్టింగ్‌లు', aiSettings:'AI సెట్టింగ్‌లు', cacheData:'కాష్ & డేటా', dangerZone:'ప్రమాద జోన్', clearCache:'కాష్ తొలగించు', clearChats:'చాట్లు తొలగించు', light:'లైట్', dark:'డార్క్', system:'సిస్టమ్', small:'చిన్న', medium:'మధ్యస్థ', large:'పెద్ద', practiceTitle:'సాధన సమస్యలు', selectTopic:'అంశం ఎంచుకో', selectDifficulty:'కష్టం ఎంచుకో', generateQuestion:'ప్రశ్న సృష్టించు', checkAnswer:'సమాధానం తనిఖీ', correct:'సరైనది!', incorrect:'తప్పు. మళ్ళీ ప్రయత్నించు.', formulaSheetTitle:'సూత్ర సూచన', algebra:'బీజగణితం', trigonometry:'త్రికోణమితి', calculus:'కాలిక్యులస్', statistics:'గణాంకాలు', linearAlgebra:'రేఖీయ బీజగణితం', cacheCleared:'కాష్ తొలగించబడింది!', confirmClear:'ఖచ్చితంగా? మొత్తం డేటా తొలగించబడుతుంది.' },
  ml: { newChat:'പുതിയ ചാറ്റ്', chat:'ചാറ്റ്', explore:'പര്യവേക്ഷണം', problems:'പ്രശ്നങ്ങൾ', history:'ചരിത്രം', bookmarks:'ബുക്ക്‌മാർക്ക്', achievements:'നേട്ടങ്ങൾ', analytics:'വിശകലനം', practice:'പരിശീലനം', formulaSheet:'സൂത്രവാക്യ ഷീറ്റ്', settings:'ക്രമീകരണങ്ങൾ', quickAccess:'ദ്രുത ആക്സസ്', solve:'പരിഹരിക്കുക', send:'അയയ്ക്കുക', appearance:'രൂപം', themeColors:'തീം നിറങ്ങൾ', fontSize:'ഫോണ്ട് വലിപ്പം', language:'ഭാഷ', light:'ലൈറ്റ്', dark:'ഡാർക്ക്', system:'സിസ്റ്റം', practiceTitle:'പരിശീലന പ്രശ്നങ്ങൾ', formulaSheetTitle:'സൂത്രവാക്യ ഷീറ്റ്', algebra:'ബീജഗണിതം', trigonometry:'ത്രികോണമിതി', calculus:'കാൽക്കുലസ്', statistics:'സ്ഥിതിവിവരക്കണക്ക്', linearAlgebra:'ലീനിയർ ആൾജിബ്ര', cacheCleared:'കാഷെ നീക്കം ചെയ്തു!', confirmClear:'ഉറപ്പാണോ?' },
  kn: { newChat:'ಹೊಸ ಚಾಟ್', chat:'ಚಾಟ್', explore:'ಅನ್ವೇಷಿಸಿ', problems:'ಸಮಸ್ಯೆಗಳು', history:'ಇತಿಹಾಸ', bookmarks:'ಬುಕ್‌ಮಾರ್ಕ್', achievements:'ಸಾಧನೆಗಳು', analytics:'ವಿಶ್ಲೇಷಣೆ', practice:'ಅಭ್ಯಾಸ', formulaSheet:'ಸೂತ್ರ ಹಾಳೆ', settings:'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', quickAccess:'ತ್ವರಿತ ಪ್ರವೇಶ', solve:'ಪರಿಹರಿಸಿ', appearance:'ನೋಟ', themeColors:'ಥೀಮ್ ಬಣ್ಣಗಳು', language:'ಭಾಷೆ', light:'ಲೈಟ್', dark:'ಡಾರ್ಕ್', system:'ಸಿಸ್ಟಮ್', practiceTitle:'ಅಭ್ಯಾಸ ಸಮಸ್ಯೆಗಳು', formulaSheetTitle:'ಸೂತ್ರ ಹಾಳೆ', algebra:'ಬೀಜಗಣಿತ', trigonometry:'ತ್ರಿಕೋಣಮಿತಿ', calculus:'ಕಲನಶಾಸ್ತ್ರ', statistics:'ಅಂಕಿಅಂಶ', linearAlgebra:'ರೇಖೀಯ ಬೀಜಗಣಿತ', cacheCleared:'ಕ್ಯಾಶ್ ಅಳಿಸಲಾಗಿದೆ!', confirmClear:'ಖಚಿತವೇ?' },
  fr: { newChat:'Nouveau Chat', chat:'Chat', explore:'Explorer', problems:'Problèmes', history:'Historique', bookmarks:'Signets', achievements:'Réalisations', analytics:'Analytique', practice:'Pratique', formulaSheet:'Feuille de Formules', settings:'Paramètres', quickAccess:'Accès Rapide', solve:'Résoudre', send:'Envoyer', searchTopics:'Rechercher des sujets...', appearance:'Apparence', themeColors:'Couleurs du Thème', fontSize:'Taille de Police', language:'Langue', mathSettings:'Paramètres Math', aiSettings:'Paramètres IA', cacheData:'Cache & Données', dangerZone:'Zone Danger', clearCache:'Vider le Cache', clearChats:'Supprimer Chats', light:'Clair', dark:'Sombre', system:'Système', small:'Petit', medium:'Moyen', large:'Grand', practiceTitle:'Problèmes de Pratique', selectTopic:'Choisir le Sujet', selectDifficulty:'Choisir la Difficulté', generateQuestion:'Générer Question', checkAnswer:'Vérifier Réponse', yourAnswer:'Votre réponse...', correct:'Correct! Bravo!', incorrect:'Incorrect. Réessayez.', formulaSheetTitle:'Feuille de Référence', algebra:'Algèbre', trigonometry:'Trigonométrie', calculus:'Calcul', statistics:'Statistiques', linearAlgebra:'Algèbre Linéaire', cacheCleared:'Cache vidé!', confirmClear:'Êtes-vous sûr? Toutes les données seront supprimées.' },
  de: { newChat:'Neuer Chat', chat:'Chat', explore:'Erkunden', problems:'Aufgaben', history:'Verlauf', bookmarks:'Lesezeichen', achievements:'Erfolge', analytics:'Analytik', practice:'Übung', formulaSheet:'Formelblatt', settings:'Einstellungen', quickAccess:'Schnellzugriff', solve:'Lösen', send:'Senden', appearance:'Aussehen', themeColors:'Themenfarben', fontSize:'Schriftgröße', language:'Sprache', light:'Hell', dark:'Dunkel', system:'System', small:'Klein', medium:'Mittel', large:'Groß', practiceTitle:'Übungsaufgaben', formulaSheetTitle:'Formelblatt', algebra:'Algebra', trigonometry:'Trigonometrie', calculus:'Analysis', statistics:'Statistik', linearAlgebra:'Lineare Algebra', cacheCleared:'Cache geleert!', confirmClear:'Sind Sie sicher?' },
  es: { newChat:'Nuevo Chat', chat:'Chat', explore:'Explorar', problems:'Problemas', history:'Historial', bookmarks:'Marcadores', achievements:'Logros', analytics:'Analítica', practice:'Práctica', formulaSheet:'Hoja de Fórmulas', settings:'Configuración', quickAccess:'Acceso Rápido', solve:'Resolver', send:'Enviar', appearance:'Apariencia', themeColors:'Colores del Tema', fontSize:'Tamaño de Fuente', language:'Idioma', light:'Claro', dark:'Oscuro', system:'Sistema', small:'Pequeño', medium:'Mediano', large:'Grande', practiceTitle:'Problemas de Práctica', formulaSheetTitle:'Hoja de Fórmulas', algebra:'Álgebra', trigonometry:'Trigonometría', calculus:'Cálculo', statistics:'Estadística', linearAlgebra:'Álgebra Lineal', cacheCleared:'¡Caché limpiado!', confirmClear:'¿Está seguro?' },
  ar: { newChat:'محادثة جديدة', chat:'محادثة', explore:'استكشاف', problems:'مسائل', history:'التاريخ', bookmarks:'إشارات مرجعية', achievements:'إنجازات', analytics:'تحليلات', practice:'تمرين', formulaSheet:'ورقة الصيغ', settings:'الإعدادات', quickAccess:'وصول سريع', solve:'حل', appearance:'المظهر', themeColors:'ألوان السمة', language:'اللغة', light:'فاتح', dark:'داكن', system:'النظام', practiceTitle:'مسائل تدريبية', formulaSheetTitle:'ورقة الصيغ', algebra:'الجبر', trigonometry:'حساب المثلثات', calculus:'التفاضل والتكامل', statistics:'الإحصاء', linearAlgebra:'الجبر الخطي', cacheCleared:'تم مسح ذاكرة التخزين!', confirmClear:'هل أنت متأكد؟' },
  ja: { newChat:'新しいチャット', chat:'チャット', explore:'探索', problems:'問題', history:'履歴', bookmarks:'ブックマーク', achievements:'実績', analytics:'分析', practice:'練習', formulaSheet:'公式集', settings:'設定', quickAccess:'クイックアクセス', solve:'解く', appearance:'外観', themeColors:'テーマカラー', language:'言語', light:'ライト', dark:'ダーク', system:'システム', practiceTitle:'練習問題', formulaSheetTitle:'公式集', algebra:'代数', trigonometry:'三角法', calculus:'微積分', statistics:'統計', linearAlgebra:'線形代数', cacheCleared:'キャッシュをクリアしました！', confirmClear:'本当にクリアしますか？' },
  zh: { newChat:'新聊天', chat:'聊天', explore:'探索', problems:'问题', history:'历史', bookmarks:'书签', achievements:'成就', analytics:'分析', practice:'练习', formulaSheet:'公式表', settings:'设置', quickAccess:'快速访问', solve:'求解', appearance:'外观', themeColors:'主题颜色', language:'语言', light:'浅色', dark:'深色', system:'系统', practiceTitle:'练习题', formulaSheetTitle:'公式参考表', algebra:'代数', trigonometry:'三角学', calculus:'微积分', statistics:'统计学', linearAlgebra:'线性代数', cacheCleared:'缓存已清除！', confirmClear:'确定吗？所有数据将被清除。' },
};

// Formula data for Formula Sheet view
const formulaData = {
  algebra: [
    { name: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / 2a' },
    { name: 'Difference of Squares', formula: 'a² - b² = (a+b)(a-b)' },
    { name: 'Perfect Square', formula: '(a ± b)² = a² ± 2ab + b²' },
    { name: 'Binomial Theorem', formula: '(a+b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ' },
    { name: 'Sum of Cubes', formula: 'a³ + b³ = (a+b)(a²-ab+b²)' },
    { name: 'Logarithm Rules', formula: 'log(ab) = log a + log b' },
  ],
  trigonometry: [
    { name: 'Pythagorean Identity', formula: 'sin²θ + cos²θ = 1' },
    { name: 'Double Angle (sin)', formula: 'sin 2θ = 2 sin θ cos θ' },
    { name: 'Double Angle (cos)', formula: 'cos 2θ = cos²θ - sin²θ' },
    { name: 'Tangent', formula: 'tan θ = sin θ / cos θ' },
    { name: 'Sum Formula', formula: 'sin(A±B) = sinA cosB ± cosA sinB' },
    { name: 'Law of Cosines', formula: 'c² = a² + b² - 2ab cos C' },
  ],
  calculus: [
    { name: 'Power Rule', formula: 'd/dx [xⁿ] = n·xⁿ⁻¹' },
    { name: 'Chain Rule', formula: 'd/dx [f(g(x))] = f\'(g(x))·g\'(x)' },
    { name: 'Product Rule', formula: 'd/dx [fg] = f\'g + fg\'' },
    { name: 'Integration Power', formula: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C' },
    { name: 'Integration by Parts', formula: '∫ u dv = uv - ∫ v du' },
    { name: 'Fundamental Theorem', formula: '∫ₐᵇ f(x)dx = F(b) - F(a)' },
  ],
  statistics: [
    { name: 'Mean', formula: 'μ = (Σxᵢ) / n' },
    { name: 'Variance', formula: 'σ² = Σ(xᵢ - μ)² / n' },
    { name: 'Standard Deviation', formula: 'σ = √(σ²)' },
    { name: 'Bayes Theorem', formula: 'P(A|B) = P(B|A)·P(A) / P(B)' },
    { name: 'Binomial Distribution', formula: 'P(X=k) = C(n,k) pᵏ (1-p)ⁿ⁻ᵏ' },
    { name: 'Normal Distribution', formula: 'f(x) = (1/σ√2π) e^(-(x-μ)²/2σ²)' },
  ],
  linearAlgebra: [
    { name: 'Determinant 2x2', formula: 'det [[a,b],[c,d]] = ad - bc' },
    { name: 'Matrix Inverse', formula: 'A⁻¹ = (1/det A) · adj(A)' },
    { name: 'Dot Product', formula: 'a·b = |a||b| cos θ' },
    { name: 'Cross Product', formula: '|a×b| = |a||b| sin θ' },
    { name: 'Eigenvalue Equation', formula: 'Av = λv' },
    { name: 'Trace', formula: 'tr(A) = Σ aᵢᵢ' },
  ],
};

// Practice questions bank
const practiceBank = {
  algebra: {
    easy: [
      { q: 'Solve: 2x + 6 = 14', a: '4', hint: 'Subtract 6 from both sides, then divide by 2' },
      { q: 'Simplify: 3(x + 2) - x', a: '2x + 6', hint: 'Distribute and combine like terms' },
      { q: 'Solve: x/3 = 9', a: '27', hint: 'Multiply both sides by 3' },
    ],
    medium: [
      { q: 'Solve: x² - 9 = 0', a: '3, -3', hint: 'Factor as difference of squares' },
      { q: 'Solve: 2x² + 5x - 3 = 0', a: '-3, 0.5', hint: 'Use the quadratic formula' },
      { q: 'Simplify: (x² - 4)/(x - 2)', a: 'x + 2', hint: 'Factor numerator' },
    ],
    hard: [
      { q: 'Solve: |2x - 5| = 7', a: '6, -1', hint: 'Split into two equations' },
      { q: 'Find roots: x³ - 6x² + 11x - 6 = 0', a: '1, 2, 3', hint: 'Try factor theorem' },
      { q: 'Solve: log₂(x) + log₂(x-2) = 3', a: '4', hint: 'Combine logs, then solve' },
    ],
  },
  calculus: {
    easy: [
      { q: 'Differentiate: f(x) = 3x²', a: '6x', hint: 'Apply power rule' },
      { q: 'Differentiate: f(x) = 5x + 7', a: '5', hint: 'Derivative of constant is 0' },
      { q: 'Integrate: ∫ 4 dx', a: '4x + C', hint: 'Integral of constant k is kx + C' },
    ],
    medium: [
      { q: 'Differentiate: f(x) = x³ + 2x² - x', a: '3x² + 4x - 1', hint: 'Apply power rule to each term' },
      { q: 'Integrate: ∫ x² dx', a: 'x³/3 + C', hint: 'Power rule for integration' },
      { q: 'Find f\'(x) if f(x) = sin(2x)', a: '2cos(2x)', hint: 'Chain rule' },
    ],
    hard: [
      { q: 'Integrate: ∫ x·eˣ dx', a: 'xeˣ - eˣ + C', hint: 'Integration by parts: u=x, dv=eˣdx' },
      { q: 'Find dy/dx: x² + y² = 25', a: '-x/y', hint: 'Implicit differentiation' },
      { q: 'Evaluate: lim(x→0) sin(x)/x', a: '1', hint: 'L\'Hôpital\'s rule or squeeze theorem' },
    ],
  },
  trigonometry: {
    easy: [
      { q: 'What is sin(90°)?', a: '1', hint: 'Unit circle value' },
      { q: 'What is cos(0°)?', a: '1', hint: 'Unit circle value' },
      { q: 'What is tan(45°)?', a: '1', hint: 'sin(45°)/cos(45°)' },
    ],
    medium: [
      { q: 'Simplify: sin²θ + cos²θ', a: '1', hint: 'Pythagorean identity' },
      { q: 'Find sin(2×30°)', a: '√3/2', hint: 'Use double angle formula' },
      { q: 'Solve: 2sinθ = 1 for 0≤θ≤360°', a: '30°, 150°', hint: 'sinθ = 1/2' },
    ],
    hard: [
      { q: 'Prove: (1+tanθ)/(1-tanθ) = tan(45°+θ)', a: 'Use tan addition formula', hint: 'tan(A+B) formula' },
      { q: 'Find all solutions: cos2θ = cosθ for 0≤θ<2π', a: '0, 2π/3, 4π/3', hint: 'Use double angle then factor' },
      { q: 'Simplify: sin3θ in terms of sinθ', a: '3sinθ - 4sin³θ', hint: 'Use sin(2θ+θ) expansion' },
    ],
  },
  statistics: {
    easy: [
      { q: 'Find mean of: 2, 4, 6, 8, 10', a: '6', hint: 'Sum/count' },
      { q: 'Find median of: 3, 7, 1, 5, 9', a: '5', hint: 'Sort and find middle value' },
      { q: 'Find mode of: 2, 3, 3, 5, 7', a: '3', hint: 'Most frequent value' },
    ],
    medium: [
      { q: 'Find variance of: 2, 4, 4, 4, 5, 5, 7, 9', a: '4', hint: 'Use σ² = Σ(x-μ)²/n' },
      { q: 'P(A)=0.3, P(B)=0.4, independent. P(A∩B)?', a: '0.12', hint: 'P(A∩B) = P(A)×P(B)' },
      { q: 'Find range of: 15, 22, 8, 31, 19', a: '23', hint: 'Max - Min' },
    ],
    hard: [
      { q: 'Z-score for x=75, μ=70, σ=5?', a: '1', hint: 'z = (x-μ)/σ' },
      { q: 'In a normal dist, what % falls within 1σ?', a: '68%', hint: '68-95-99.7 rule' },
      { q: 'P(A)=0.6, P(B|A)=0.3. Find P(A∩B)', a: '0.18', hint: 'P(A∩B) = P(B|A)×P(A)' },
    ],
  },
  linearAlgebra: {
    easy: [
      { q: 'Find det [[2,3],[1,4]]', a: '5', hint: 'ad - bc' },
      { q: 'Add: [1,2] + [3,4]', a: '[4,6]', hint: 'Add corresponding elements' },
      { q: 'Scalar multiply: 3 × [2,5]', a: '[6,15]', hint: 'Multiply each element by 3' },
    ],
    medium: [
      { q: 'Find det [[1,2,0],[0,1,3],[2,0,1]]', a: '7', hint: 'Expand along first row' },
      { q: 'Multiply [[1,0],[0,1]] × [[3,4],[5,6]]', a: '[[3,4],[5,6]]', hint: 'Identity matrix' },
      { q: 'Find eigenvalues of [[2,0],[0,3]]', a: '2, 3', hint: 'Diagonal matrix eigenvalues' },
    ],
    hard: [
      { q: 'Rank of [[1,2,3],[2,4,6],[1,1,1]]?', a: '2', hint: 'Row reduce to echelon form' },
      { q: 'Is [[1,2],[3,4]] invertible?', a: 'Yes (det=−2≠0)', hint: 'Check if determinant ≠ 0' },
      { q: 'Find eigenvalues of [[3,1],[0,2]]', a: '3, 2', hint: 'Upper triangular: eigenvalues on diagonal' },
    ],
  },
};

// Dynamic math coordinates graph canvas plotter
const MathGraphPlotter = ({ query }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.parentElement.clientWidth || 300);
    const height = (canvas.height = 200);

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#E5E7EB';
    if (document.documentElement.classList.contains('dark')) {
      ctx.strokeStyle = '#222226';
    }
    ctx.lineWidth = 0.5;

    const gridSize = 20;
    const centerX = width / 2;
    const centerY = height / 2;

    for (let x = centerX; x < width; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let x = centerX; x > 0; x -= gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = centerY; y < height; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    for (let y = centerY; y > 0; y -= gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    ctx.strokeStyle = '#6B7280';
    if (document.documentElement.classList.contains('dark')) {
      ctx.strokeStyle = '#8B8D98';
    }
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(width, centerY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height); ctx.stroke();

    const parseFunc = (q) => {
      const lower = q.toLowerCase();
      if (lower.includes('sin')) return (x) => Math.sin(x) * 2;
      if (lower.includes('cos')) return (x) => Math.cos(x) * 2;
      if (lower.includes('tan')) return (x) => Math.tan(x) * 0.5;
      if (lower.includes('x^2') || lower.includes('x²')) {
        return (x) => (x * x - 5 * x + 6) * 0.2;
      }
      if (lower.includes('x^3') || lower.includes('x³')) {
        return (x) => (x * x * x + 2 * x * x) * 0.05;
      }
      return (x) => x * x * 0.2;
    };

    const func = parseFunc(query || '');

    // Use accent color for curve
    const accentStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    ctx.strokeStyle = accentStyle || '#111111';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let first = true;
    const scaleX = 20;
    const scaleY = 20;

    for (let pxX = 0; pxX < width; pxX++) {
      const mathX = (pxX - centerX) / scaleX;
      const mathY = func(mathX);
      const pxY = centerY - (mathY * scaleY);

      if (pxY >= 0 && pxY <= height) {
        if (first) {
          ctx.moveTo(pxX, pxY);
          first = false;
        } else {
          ctx.lineTo(pxX, pxY);
        }
      }
    }
    ctx.stroke();

    ctx.fillStyle = '#6B7280';
    ctx.font = '9px monospace';
    ctx.fillText('y = f(x) Plot', 10, 15);
  }, [query]);

  return (
    <div className="border border-border-custom bg-background-secondary rounded-xl overflow-hidden p-2 flex justify-center w-full">
      <canvas ref={canvasRef} className="w-full max-w-full block" />
    </div>
  );
};

const ChatWorkspace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { xp, level, streak, rank, addXp, updateMissionProgress, unlockAchievement } = useGame();

  // Sidebar collapsing toggle state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Active navigation view state
  const [activeView, setActiveView] = useState('chat');

  // Settings accordion state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSection, setSettingsSection] = useState('');

  // Settings state
  const [appearance, setAppearance] = useState(() => localStorage.getItem('matai_appearance') || 'light');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('matai_accent') || 'white');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('matai_font_size') || 'medium');
  const [language, setLanguage] = useState(() => localStorage.getItem('matai_language') || 'en');
  const [katexEnabled, setKatexEnabled] = useState(true);
  const [showSteps, setShowSteps] = useState(true);
  const [autoSimplify, setAutoSimplify] = useState(true);
  const [angleUnit, setAngleUnit] = useState('radians');
  const [aiModel, setAiModel] = useState('llama3-70b');
  const [responseLength, setResponseLength] = useState(70);
  const [temperature, setTemperature] = useState(50);
  const [storageCacheSize, setStorageCacheSize] = useState('14.2 MB');

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSolutionHtml, setCurrentSolutionHtml] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // Responsive state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Right pane tab control
  const [activeOutputTab, setActiveOutputTab] = useState('solution');

  // Video state
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [videoRendering, setVideoRendering] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [triggerVideoRender, setTriggerVideoRender] = useState(false);

  // Collapsible sections
  const [expandedOverview, setExpandedOverview] = useState(true);
  const [expandedSteps, setExpandedSteps] = useState(true);
  const [expandedFinal, setExpandedFinal] = useState(true);

  // Search/filter state
  const [exploreSearch, setExploreSearch] = useState('');
  const [problemsSearch, setProblemsSearch] = useState('');
  const [problemsFilterCategory, setProblemsFilterCategory] = useState('all');
  const [problemsFilterDifficulty, setProblemsFilterDifficulty] = useState('all');
  const [historySearch, setHistorySearch] = useState('');
  const [historySortAsc, setHistorySortAsc] = useState(false);
  const [bookmarksSearch, setBookmarksSearch] = useState('');
  const [bookmarksCategory, setBookmarksCategory] = useState('all');

  // Stats
  const [statsProblemsSolved, setStatsProblemsSolved] = useState(48);
  const [statsVisualsCount, setStatsVisualsCount] = useState(15);
  const [statsVideosWatched, setStatsVideosWatched] = useState(8);

  // Practice state
  const [practiceTopic, setPracticeTopic] = useState('algebra');
  const [practiceDifficulty, setPracticeDifficulty] = useState('easy');
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceResult, setPracticeResult] = useState(null);

  // Formula sheet active category
  const [formulaCategory, setFormulaCategory] = useState('algebra');

  // Bookmarks & History
  const [bookmarksList, setBookmarksList] = useState(() => {
    const cached = localStorage.getItem('matai_bookmarks_v2');
    return cached ? JSON.parse(cached) : [
      { id: 'b1', title: 'Quadratic roots derivation formula', type: 'solution', query: 'x^2 - 5x + 6 = 0', date: '2026-06-12' },
      { id: 'b2', title: 'Derivative trigonometric wave plot', type: 'graph', query: 'sin(x)', date: '2026-06-11' }
    ];
  });

  const [historyList, setHistoryList] = useState(() => {
    const cached = localStorage.getItem('matai_history_v2');
    return cached ? JSON.parse(cached) : [
      { id: 'h1', title: 'Solve x^2 - 5x + 6 = 0', query: 'x^2 - 5x + 6 = 0', date: '2026-06-13T10:30:00Z', pinned: true },
      { id: 'h2', title: 'Differentiate x^3 + 2x^2', query: 'x^3 + 2x^2', date: '2026-06-12T14:15:00Z', pinned: false },
      { id: 'h3', title: 'Integrate sin(x)', query: 'Integrate sin(x)', date: '2026-06-11T09:00:00Z', pinned: false }
    ];
  });

  useEffect(() => { localStorage.setItem('matai_bookmarks_v2', JSON.stringify(bookmarksList)); }, [bookmarksList]);
  useEffect(() => { localStorage.setItem('matai_history_v2', JSON.stringify(historyList)); }, [historyList]);

  const messagesEndRef = useRef(null);

  // ============================================================
  // TRANSLATION HELPER
  // ============================================================
  const t = (key) => {
    const lang = translations[language] || translations.en;
    return lang[key] || translations.en[key] || key;
  };

  // ============================================================
  // THEME APPLICATION — Appearance + Accent Color via CSS classes
  // ============================================================
  useEffect(() => {
    const root = window.document.documentElement;
    if (appearance === 'dark') {
      root.classList.add('dark');
    } else if (appearance === 'light') {
      root.classList.remove('dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      systemDark ? root.classList.add('dark') : root.classList.remove('dark');
    }
    localStorage.setItem('matai_appearance', appearance);
  }, [appearance]);

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all accent classes
    root.classList.remove('accent-white', 'accent-black', 'accent-blue', 'accent-green', 'accent-orange');
    // Apply selected accent
    root.classList.add(`accent-${accentColor}`);
    localStorage.setItem('matai_accent', accentColor);
  }, [accentColor]);

  useEffect(() => { localStorage.setItem('matai_language', language); }, [language]);

  // Font size
  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-xs';
    if (fontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  // ============================================================
  // MATH ENGINE
  // ============================================================
  const mathEngineSolve = (q) => {
    const clean = q.toLowerCase().trim();
    if (clean.includes('integrate') || clean.includes('integration') || clean.includes('∫')) {
      return { overview: "Calculus integration finds the area accumulated under a mathematical curve.", steps: [{ title: "Identify formula rule", body: "Check expression parameters. For polynomial ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C." }, { title: "Calculate anti-derivative", body: "Integrating sin(x) yields -cos(x) + C. For x³, integration becomes (x⁴)/4 + C." }, { title: "Evaluate constants", body: "Add arbitrary integration constant C since limits are indefinite." }], final: "∫ f(x) dx = -cos(x) + C", alternative: "Numerical trapezoidal approximation computes area sums sequentially.", formula: "\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C", concept: "Anti-derivatives" };
    }
    if (clean.includes('differentiate') || clean.includes('derivative') || clean.includes('d/dx')) {
      return { overview: "Differentiation computes rate of change for smooth parametric functions.", steps: [{ title: "Identify terms", body: "Break expression into polynomial terms." }, { title: "Apply power rule", body: "d/dx [xⁿ] = n·xⁿ⁻¹" }, { title: "Combine results", body: "Sum individual derivative results." }], final: "f'(x) = 3x² + 4x", alternative: "Chain rule for composite functions.", formula: "\\frac{d}{dx}[x^n] = nx^{n-1}", concept: "Derivatives" };
    }
    if (clean.includes('sin') || clean.includes('cos') || clean.includes('tan') || clean.includes('trig')) {
      return { overview: "Trigonometric functions map angular rotations to ratios.", steps: [{ title: "Identify function", body: "sin, cos, tan, or their inverses." }, { title: "Apply identities", body: "sin²θ + cos²θ = 1" }, { title: "Simplify", body: "Use unit circle values." }], final: "sin²θ + cos²θ = 1", alternative: "Taylor series approximation.", formula: "\\sin^2\\theta + \\cos^2\\theta = 1", concept: "Trigonometric Identities" };
    }
    if (clean.includes('matrix') || clean.includes('determinant') || clean.includes('eigenvalue')) {
      return { overview: "Matrix algebra provides tools for systems of linear equations.", steps: [{ title: "Setup matrix", body: "Arrange coefficients in matrix form." }, { title: "Compute determinant", body: "det(A) = ad - bc for 2x2 matrix." }, { title: "Find eigenvalues", body: "Solve det(A - λI) = 0." }], final: "det(A) = ad - bc", alternative: "Row reduction for larger matrices.", formula: "\\det(A) = ad - bc", concept: "Linear Algebra" };
    }
    if (clean.includes('limit') || clean.includes('lim')) {
      return { overview: "Limits evaluate function behavior approaching a target value.", steps: [{ title: "Direct substitution", body: "Try plugging in the target value." }, { title: "Factor if indeterminate", body: "Factor to cancel common terms." }, { title: "Apply L'Hôpital's rule", body: "If 0/0 or ∞/∞, differentiate top and bottom." }], final: "lim f(x) = L", alternative: "Squeeze theorem for bounded functions.", formula: "\\lim_{x \\to a} f(x) = L", concept: "Limits" };
    }
    // Default: quadratic/algebraic
    return { overview: "Algebraic equations evaluate roots where polynomial curves cross y = 0 axes.", steps: [{ title: "Identify coefficients", body: "For x² - 5x + 6 = 0, a=1, b=-5, c=6." }, { title: "Substitute quadratic formula", body: "x = [-b ± √(b² - 4ac)] / 2a. Roots solve to x = 3 and x = 2." }, { title: "Factor expression bounds", body: "Rewrite: (x - 3)(x - 2) = 0." }], final: "x = 3, x = 2", alternative: "Complete the square method.", formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", concept: "Polynomial Root Factoring" };
  };

  // Submit solver chat prompt
  const submitQuery = async (queryText) => {
    if (!queryText.trim()) return;
    const userMsg = { id: `user-${Date.now()}`, role: 'user', content: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setCurrentQuery(queryText);
    const newHist = { id: `h-${Date.now()}`, title: queryText.length > 25 ? queryText.slice(0, 25) + '...' : queryText, query: queryText, date: new Date().toISOString(), pinned: false };
    setHistoryList(prev => [newHist, ...prev]);
    setStatsProblemsSolved(prev => prev + 1);

    try {
      const res = await fetch('/solution', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: queryText }) });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { id: `bot-${Date.now()}`, role: 'bot', content: data.message, rawQuery: queryText }]);
        setCurrentSolutionHtml(data.message);
        setTriggerVideoRender(true);
        addXp(50);
        updateMissionProgress('calc_quest', 1);
        updateMissionProgress('alg_champion', 1);
      } else { throw new Error('Fallback'); }
    } catch (err) {
      const localResult = mathEngineSolve(queryText);
      const htmlOutput = `<div class="space-y-4"><p class="font-bold text-xs uppercase tracking-wide" style="color:var(--accent)">LOCAL AI SOLVER NODE Fallback</p><h4 class="font-bold text-sm text-text-primary">${localResult.overview}</h4><div class="p-3 border border-border-custom bg-background-secondary rounded-lg"><code class="font-mono text-xs text-text-primary">${localResult.formula}</code></div><div class="space-y-2"><h5 class="text-xs font-semibold text-text-secondary">Formula Derivations:</h5><ol class="list-decimal pl-4 space-y-1 text-xs text-text-secondary">${localResult.steps.map(s => `<li><strong>${s.title}</strong>: ${s.body}</li>`).join('')}</ol></div><div class="pt-2 border-t border-border-custom text-xs"><span class="text-text-secondary">Alternative Method:</span><p class="text-text-primary leading-relaxed">${localResult.alternative}</p></div><div class="pt-2 border-t border-border-custom text-xs"><span class="text-text-secondary">Concept:</span><span class="inline-block bg-background-secondary px-2 py-0.5 rounded text-[10px] ml-1 font-semibold">${localResult.concept}</span></div></div>`;
      setTimeout(() => {
        setMessages(prev => [...prev, { id: `bot-${Date.now()}`, role: 'bot', content: htmlOutput, rawQuery: queryText }]);
        setCurrentSolutionHtml(htmlOutput);
        setTriggerVideoRender(true);
        addXp(30);
      }, 1000);
    } finally { setLoading(false); }
  };

  const handleSend = (e) => { e.preventDefault(); submitQuery(input); };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleVoiceClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognition.start();
    }
  };

  const handleClearHistory = () => {
    setMessages([{ id: 'welcome', role: 'bot', content: "<p>All conversations cleared. Submit a new mathematical question.</p>" }]);
    setHistoryList([]);
    setCurrentSolutionHtml('');
    setCurrentQuery('');
    setTriggerVideoRender(false);
  };

  const handleClearCache = () => {
    if (!window.confirm(t('confirmClear'))) return;
    // Clear all matai localStorage keys
    Object.keys(localStorage).filter(k => k.startsWith('matai_')).forEach(k => localStorage.removeItem(k));
    sessionStorage.clear();
    setStorageCacheSize('0.0 KB');
    setMessages([]);
    setCurrentSolutionHtml('');
    setCurrentQuery('');
    setHistoryList([]);
    setBookmarksList([]);
    alert(t('cacheCleared'));
  };

  // Video controls
  const handlePlayPause = () => { if (!videoRef.current) return; isPlaying ? videoRef.current.pause() : videoRef.current.play(); setIsPlaying(!isPlaying); };
  const handleLoadedMetadata = () => { if (videoRef.current) setDuration(videoRef.current.duration); };
  const handleTimeUpdate = () => { if (videoRef.current) setCurrentTime(videoRef.current.currentTime); };
  const handleSpeedChange = (e) => { const val = parseFloat(e.target.value); setVideoSpeed(val); if (videoRef.current) videoRef.current.playbackRate = val; };
  const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${mins}:${secs < 10 ? '0' : ''}${secs}`; };

  // Bookmark functions
  const addBookmarkItem = (type, title, query) => {
    if (bookmarksList.some(b => b.query === query && b.type === type)) return;
    setBookmarksList(prev => [...prev, { id: `b-${Date.now()}`, title: title || `Bookmark: ${query}`, type, query, date: new Date().toISOString().split('T')[0] }]);
    unlockAchievement('first_bookmark', 'Curator Scholar', 'Saved your first derivation', '🔖');
  };
  const removeBookmarkItem = (id) => { setBookmarksList(prev => prev.filter(b => b.id !== id)); };

  // Practice functions
  const generatePracticeQuestion = () => {
    const bank = practiceBank[practiceTopic]?.[practiceDifficulty] || practiceBank.algebra.easy;
    const q = bank[Math.floor(Math.random() * bank.length)];
    setPracticeQuestion(q);
    setPracticeAnswer('');
    setPracticeResult(null);
  };
  const checkPracticeAnswer = () => {
    if (!practiceQuestion || !practiceAnswer.trim()) return;
    const correct = practiceAnswer.trim().toLowerCase() === practiceQuestion.a.toLowerCase();
    setPracticeResult(correct);
    if (correct) { addXp(25); setStatsProblemsSolved(prev => prev + 1); }
  };

  // Data
  const trendingTopics = [
    { name: "Taylor Series expansions", desc: "Converging series values of sin(x), cos(x)", query: "Deduce Taylor series of sin(x)" },
    { name: "Eigenvalues of 3x3 Matrices", desc: "Solve det(A - λI) characteristics", query: "Eigenvalues of matrix [[1,2,0],[2,1,0],[0,0,3]]" },
    { name: "Bayesian probability theory", desc: "Conditional probabilities and distributions", query: "Mean and variance of bayesian distribution" },
    { name: "Limit Indeterminate Bounds", desc: "Factor expressions to cancel divisions by zero", query: "Limit as x approaches 2 of (x^2 - 4)/(x - 2)" }
  ];
  const popularProblems = [
    { text: "Solve x^2 - 5x + 6 = 0", difficulty: "Basic", category: "Algebra" },
    { text: "Differentiate x^3 + 2x^2", difficulty: "Intermediate", category: "Calculus" },
    { text: "Integrate sin(x)", difficulty: "Basic", category: "Calculus" },
    { text: "Determinant of [[1,2],[3,4]]", difficulty: "Intermediate", category: "Linear Algebra" },
    { text: "Solve dy/dx + 2y = e^x", difficulty: "Advanced", category: "Differential Equations" }
  ];
  const learningPaths = [
    { name: "Calculus", count: "8 lessons", progress: "40%", path: ["Limits", "Derivatives", "Integrals"] },
    { name: "Algebra", count: "12 lessons", progress: "85%", path: ["Equations", "Polynomials", "Matrices"] },
    { name: "Geometry", count: "6 lessons", progress: "10%", path: ["Coordinate points", "Trigonometric ratios"] }
  ];

  const sidebarNavItems = [
    { label: 'newChat', icon: Plus, isAction: true },
    { label: 'chat', icon: MessageSquare },
    { label: 'explore', icon: Compass },
    { label: 'problems', icon: HelpCircle },
    { label: 'history', icon: History },
    { label: 'bookmarks', icon: Bookmark },
    { label: 'achievements', icon: Award },
    { label: 'analytics', icon: BarChart2 },
  ];

  const quickAccessItems = [
    { label: 'practice', icon: Dumbbell },
    { label: 'formula sheet', icon: FileText },
  ];

  const quickChips = ['Solve x² - 5x + 6 = 0', 'Differentiate x³ + 2x²'];

  const mockSteps = currentSolutionHtml ? [
    { title: 'Step 1: Identify Expression', body: `Analyzing the input query: ${currentQuery}` },
    { title: 'Step 2: Apply Formula', body: 'Using standard mathematical rules and identities.' },
    { title: 'Step 3: Simplify', body: 'Reducing terms to canonical form.' },
  ] : [{ title: 'Awaiting Input', body: 'Submit a query to see derivations.' }];

  const relatedConcepts = [
    { name: 'Quadratic Formula Derivation', query: 'Derive quadratic formula' },
    { name: 'Chain Rule for Derivatives', query: 'Differentiate sin(x^2)' },
    { name: 'Integration by Parts', query: 'Integrate x*e^x' },
    { name: 'Matrix Determinants', query: 'Determinant of [[1,2],[3,4]]' },
  ];

  const languageOptions = [
    { code: 'en', name: 'English' }, { code: 'ta', name: 'தமிழ்' }, { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' }, { code: 'ml', name: 'മലയാളം' }, { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'fr', name: 'Français' }, { code: 'de', name: 'Deutsch' }, { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' }, { code: 'ja', name: '日本語' }, { code: 'zh', name: '中文' },
  ];

  // Settings accordion toggle
  const toggleSettingsSection = (section) => {
    setSettingsSection(prev => prev === section ? '' : section);
  };

  return (
    <div className={`min-h-screen bg-background-primary flex text-text-primary ${getFontSizeClass()} font-sans overflow-hidden relative`}>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* COLUMN 1: LEFT SIDEBAR */}
      <aside className={`border-r border-border-custom bg-background-secondary flex flex-col h-screen flex-shrink-0 select-none transition-all duration-300 z-50
        md:static md:translate-x-0
        ${mobileSidebarOpen ? 'translate-x-0 fixed left-0 top-0' : '-translate-x-full fixed left-0 top-0'}
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}>
        {/* Brand */}
        <div className="p-4 border-b border-border-custom flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>
              M
            </div>
            {!sidebarCollapsed && (
              <span className="font-display font-bold text-base tracking-tight text-text-primary whitespace-nowrap">MatAI Workspace</span>
            )}
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded hover:bg-background-primary text-text-secondary hover:text-text-primary transition-all cursor-pointer"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight size={14} className={`transform transition-transform duration-300 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow py-4 px-3 overflow-y-auto space-y-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeView === t(item.label).toLowerCase();
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.isAction) {
                      setActiveView('chat');
                      setMessages([{ id: 'welcome', role: 'bot', content: "<p>New conversation started. Submit any mathematical problem below.</p>" }]);
                    } else {
                      setActiveView(item.label);
                    }
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-background-primary border border-border-custom text-text-primary font-bold shadow-xs' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-background-primary/50'
                  } ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
                  title={t(item.label)}
                  style={isActive ? { color: 'var(--accent)' } : {}}
                >
                  <Icon size={14} style={isActive ? { color: 'var(--accent)' } : {}} />
                  {!sidebarCollapsed && <span>{t(item.label)}</span>}
                </button>
              );
            })}
          </div>

          {/* Quick Access */}
          {!sidebarCollapsed && (
            <div className="space-y-2 pt-2 border-t border-border-custom">
              <span className="px-3 text-[10px] font-mono text-text-secondary uppercase tracking-wider block">{t('quickAccess')}</span>
              <div className="space-y-0.5">
                {quickAccessItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveView(item.label)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-background-primary border border-border-custom text-text-primary shadow-xs' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-background-primary/50'
                      }`}
                      style={isActive ? { color: 'var(--accent)' } : {}}
                    >
                      <Icon size={14} style={isActive ? { color: 'var(--accent)' } : {}} />
                      <span>{t(item.label === 'formula sheet' ? 'formulaSheet' : item.label)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Settings Accordion */}
          {!sidebarCollapsed && (
            <div className="space-y-1 pt-2 border-t border-border-custom">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-background-primary/50 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Settings size={14} />
                  <span>{t('settings')}</span>
                </div>
                <ChevronDown size={12} className={`transform transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
              </button>

              {settingsOpen && (
                <div className="ml-2 space-y-1 animate-fade-in">
                  {/* Appearance */}
                  <div className="border border-border-custom rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('appearance')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary bg-background-primary/50 cursor-pointer">
                      <span>{t('appearance')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'appearance' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'appearance' && (
                      <div className="p-2 space-y-2 bg-background-primary">
                        <div className="grid grid-cols-3 gap-1">
                          {['light', 'dark', 'system'].map((mode) => (
                            <button key={mode} onClick={() => setAppearance(mode)}
                              className={`py-1 rounded text-[9px] font-bold uppercase cursor-pointer transition-all ${appearance === mode ? 'text-white' : 'text-text-secondary hover:text-text-primary bg-background-secondary'}`}
                              style={appearance === mode ? { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' } : {}}
                            >{t(mode)}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Theme Colors */}
                  <div className="border border-border-custom rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('theme')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary bg-background-primary/50 cursor-pointer">
                      <span>{t('themeColors')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'theme' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'theme' && (
                      <div className="p-2 bg-background-primary">
                        <div className="flex gap-2 justify-center">
                          {[
                            { id: 'white', color: '#888', label: 'W' },
                            { id: 'black', color: '#000', label: 'B' },
                            { id: 'blue', color: '#2563EB', label: '' },
                            { id: 'green', color: '#16A34A', label: '' },
                            { id: 'orange', color: '#EA580C', label: '' },
                          ].map((ac) => (
                            <button key={ac.id} onClick={() => setAccentColor(ac.id)}
                              className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${accentColor === ac.id ? 'ring-2 ring-border-custom border-text-primary scale-110' : 'border-transparent'}`}
                              style={{ backgroundColor: ac.color }}
                              title={ac.id}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Language */}
                  <div className="border border-border-custom rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('language')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary bg-background-primary/50 cursor-pointer">
                      <span>{t('language')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'language' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'language' && (
                      <div className="p-2 bg-background-primary">
                        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full text-xs p-1.5 rounded border border-border-custom bg-background-primary">
                          {languageOptions.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Font Size */}
                  <div className="border border-border-custom rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('font')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary bg-background-primary/50 cursor-pointer">
                      <span>{t('fontSize')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'font' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'font' && (
                      <div className="p-2 bg-background-primary">
                        <div className="grid grid-cols-3 gap-1">
                          {['small', 'medium', 'large'].map((size) => (
                            <button key={size} onClick={() => { setFontSize(size); localStorage.setItem('matai_font_size', size); }}
                              className={`py-1 rounded text-[9px] font-bold uppercase cursor-pointer transition-all ${fontSize === size ? '' : 'text-text-secondary bg-background-secondary'}`}
                              style={fontSize === size ? { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' } : {}}
                            >{t(size)}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Math Settings */}
                  <div className="border border-border-custom rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('math')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary bg-background-primary/50 cursor-pointer">
                      <span>{t('mathSettings')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'math' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'math' && (
                      <div className="p-2 space-y-1.5 bg-background-primary">
                        <label className="flex items-center space-x-2 text-[10px] text-text-secondary cursor-pointer"><input type="checkbox" checked={katexEnabled} onChange={(e) => setKatexEnabled(e.target.checked)} className="h-3 w-3" /><span>{t('katex')}</span></label>
                        <label className="flex items-center space-x-2 text-[10px] text-text-secondary cursor-pointer"><input type="checkbox" checked={showSteps} onChange={(e) => setShowSteps(e.target.checked)} className="h-3 w-3" /><span>{t('showSteps')}</span></label>
                        <label className="flex items-center space-x-2 text-[10px] text-text-secondary cursor-pointer"><input type="checkbox" checked={autoSimplify} onChange={(e) => setAutoSimplify(e.target.checked)} className="h-3 w-3" /><span>{t('autoSimplify')}</span></label>
                        <div className="pt-1">
                          <label className="text-[9px] font-semibold text-text-secondary">{t('angleUnit')}</label>
                          <select value={angleUnit} onChange={(e) => setAngleUnit(e.target.value)} className="w-full text-[10px] p-1 rounded border border-border-custom bg-background-primary mt-0.5">
                            <option value="radians">Radians</option><option value="degrees">Degrees</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Settings */}
                  <div className="border border-border-custom rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('ai')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary bg-background-primary/50 cursor-pointer">
                      <span>{t('aiSettings')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'ai' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'ai' && (
                      <div className="p-2 space-y-2 bg-background-primary">
                        <div>
                          <label className="text-[9px] font-semibold text-text-secondary">{t('aiModel')}</label>
                          <select value={aiModel} onChange={(e) => setAiModel(e.target.value)} className="w-full text-[10px] p-1 rounded border border-border-custom bg-background-primary mt-0.5">
                            <option value="llama3-70b">Llama 3 70B (Groq)</option>
                            <option value="mixtral-8x7b">Mixtral 8x7B</option>
                            <option value="gpt4o">GPT-4o</option>
                            <option value="claude3.5">Claude 3.5 Sonnet</option>
                          </select>
                        </div>
                        <div>
                          <div className="flex justify-between text-[9px] text-text-secondary"><span>{t('responseLen')}</span><span>{responseLength * 5} tokens</span></div>
                          <input type="range" min="1" max="100" value={responseLength} onChange={(e) => setResponseLength(parseInt(e.target.value))} className="w-full h-1 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                          <div className="flex justify-between text-[9px] text-text-secondary"><span>{t('temperature')}</span><span>{(temperature/100).toFixed(2)}</span></div>
                          <input type="range" min="0" max="100" value={temperature} onChange={(e) => setTemperature(parseInt(e.target.value))} className="w-full h-1 rounded-lg appearance-none cursor-pointer" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cache & Data */}
                  <div className="border border-border-custom rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('cache')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary bg-background-primary/50 cursor-pointer">
                      <span>{t('cacheData')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'cache' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'cache' && (
                      <div className="p-2 space-y-2 bg-background-primary">
                        <div className="flex justify-between text-[10px] text-text-secondary"><span>Cached:</span><span className="font-mono font-semibold text-text-primary">{storageCacheSize}</span></div>
                        <button onClick={handleClearCache} className="w-full py-1 rounded text-[10px] font-bold cursor-pointer transition-all" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>{t('clearCache')}</button>
                      </div>
                    )}
                  </div>

                  {/* Danger Zone */}
                  <div className="border border-red-300 dark:border-red-900 rounded-lg overflow-hidden">
                    <button onClick={() => toggleSettingsSection('danger')} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-background-primary/50 cursor-pointer">
                      <span>{t('dangerZone')}</span>
                      <ChevronRight size={10} className={`transform transition-transform ${settingsSection === 'danger' ? 'rotate-90' : ''}`} />
                    </button>
                    {settingsSection === 'danger' && (
                      <div className="p-2 bg-background-primary">
                        <button onClick={handleClearHistory} className="w-full py-1.5 rounded bg-red-100 hover:bg-red-200 dark:bg-red-950/40 border border-red-300 dark:border-red-900 text-[10px] font-semibold text-red-600 dark:text-red-400 flex items-center justify-center space-x-1 cursor-pointer">
                          <Trash2 size={11} /><span>{t('clearChats')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Bottom stats */}
        <div className="p-3 border-t border-border-custom space-y-3 bg-background-primary/40">
          {!sidebarCollapsed ? (
            <div className="border border-border-custom bg-background-primary p-3 rounded-xl space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between items-center text-text-secondary"><span>{t('rank')}:</span><span className="font-bold text-text-primary">{rank}</span></div>
              <div className="flex justify-between items-center text-text-secondary"><span>{t('level')}:</span><span className="font-bold text-text-primary">{level}</span></div>
              <div className="flex justify-between items-center text-text-secondary"><span>XP:</span><span className="font-bold text-text-primary">{xp}</span></div>
              <div className="flex justify-between items-center text-text-secondary"><span>{t('streak')}:</span><span className="font-bold text-text-primary flex items-center space-x-0.5"><Flame size={11} className="fill-orange-400 text-orange-400" /><span>{streak} days</span></span></div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 rounded-full border border-border-custom bg-background-primary flex items-center justify-center text-[10px] font-bold text-text-primary">L{level}</div>
              <div className="flex items-center text-orange-400 text-xs font-bold font-mono"><Flame size={14} className="fill-orange-400" /><span>{streak}d</span></div>
            </div>
          )}
        </div>
      </aside>

      {/* COLUMN 2: MAIN VIEW WORKSPACE */}
      <section className="flex-1 border-r border-border-custom flex flex-col h-screen overflow-hidden bg-background-primary">
        <header className="p-4 border-b border-border-custom flex items-center justify-between bg-background-secondary md:static sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-background-primary text-text-primary cursor-pointer"
            >
              <Menu size={18} />
            </button>
            <span className="font-mono text-xs font-bold text-text-primary border border-border-custom px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent-light)' }}>
              {activeView.toUpperCase()} VIEW
            </span>
            <span className="text-[11px] text-text-secondary font-medium">{t('mathEngine')}</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-text-secondary">
            {/* Right Panel Toggle for Mobile/Tablet */}
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-background-primary text-text-primary cursor-pointer"
            >
              <PanelRight size={18} />
            </button>
            <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-orange-400 animate-pulse' : 'bg-green-500'}`}></span>
            <span>{loading ? t('compiling') : t('online')}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          
          {/* A. CHAT VIEW - REDESIGNED */}
          {activeView === 'chat' && (
            <div className="h-full flex flex-col">
              <AnimatePresence mode="wait">
                {messages.length === 0 ? (
                  <motion.div
                    key="centered"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex-1 flex flex-col md:items-center md:justify-center"
                  >
                    <div className="flex-1 md:flex-none md:w-full flex flex-col items-center justify-center px-4 md:px-8 pb-20 md:pb-0">
                      {/* Logo */}
                      <div className="mb-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg"
                          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                        >
                          M
                        </div>
                      </div>

                      {/* Heading */}
                      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 text-center">
                        How can I help you solve mathematics today?
                      </h2>
                      <p className="text-xs md:text-sm text-text-secondary mb-8 text-center max-w-lg px-2">
                        Ask anything from algebra to calculus, get step-by-step solutions, animated explanations, and interactive visualizations.
                      </p>

                      {/* Mobile Suggested Prompt Cards (Above Input) */}
                      <div className="w-full max-w-2xl grid grid-cols-1 gap-3 px-2 md:hidden mb-4">
                        {quickChips.map((chip, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => submitQuery(chip)}
                            className="text-left p-4 rounded-xl border border-border-custom bg-background-primary hover:bg-background-secondary transition-all hover:border-[var(--accent)] cursor-pointer group"
                          >
                            <div className="font-semibold text-sm text-text-primary group-hover:text-[var(--accent)]">
                              {chip}
                            </div>
                            <div className="text-xs text-text-secondary mt-1">
                              Try this example
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Desktop Layout (Original) */}
                      <div className="hidden md:flex flex-col md:flex-col-reverse w-full max-w-2xl">
                        {/* Desktop Suggested Cards (Below Input) */}
                        <div className="w-full grid grid-cols-1 gap-3 px-0">
                          {quickChips.map((chip, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() => submitQuery(chip)}
                              className="text-left p-4 rounded-xl border border-border-custom bg-background-primary hover:bg-background-secondary transition-all hover:border-[var(--accent)] cursor-pointer group"
                            >
                              <div className="font-semibold text-sm text-text-primary group-hover:text-[var(--accent)]">
                                {chip}
                              </div>
                              <div className="text-xs text-text-secondary mt-1">
                                Try this example
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        {/* Desktop Original Prompt Input */}
                        <form
                          onSubmit={handleSend}
                          className="w-full mb-8"
                        >
                          <div className="relative flex items-center gap-2 px-3 py-2 bg-background-secondary border-2 border-border-custom rounded-2xl shadow-sm focus-within:border-[var(--accent)]">
                            <button
                              type="button"
                              onClick={handleFileClick}
                              className="p-2 rounded-xl text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                            >
                              <Paperclip size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={handleVoiceClick}
                              className="p-2 rounded-xl text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                            >
                              <Mic size={18} />
                            </button>
                            <input
                              type="text"
                              placeholder={t('askPlaceholder')}
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              disabled={loading}
                              autoFocus
                              className="flex-grow bg-transparent border-none text-sm focus:outline-none placeholder:text-text-secondary/60"
                            />
                            {selectedFile && (
                              <div className="text-xs text-text-secondary px-2 py-1 bg-background-primary rounded-lg">
                                {selectedFile.name}
                              </div>
                            )}
                            <button
                              type="submit"
                              disabled={loading || !input.trim()}
                              className="p-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                            >
                              <ArrowRight size={18} />
                            </button>
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </form>
                      </div>
                    </div>

                    {/* Mobile Fixed Bottom Input (Initial State) */}
                    <form
                      onSubmit={handleSend}
                      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background-primary/80 backdrop-blur-md border-t border-border-custom p-3"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="max-w-2xl mx-auto flex items-center gap-2 bg-background-secondary rounded-full px-4 py-3 shadow-sm">
                        <button
                          type="button"
                          onClick={handleFileClick}
                          className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          <Paperclip size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={handleVoiceClick}
                          className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          <Mic size={18} />
                        </button>
                        <input
                          type="text"
                          placeholder="Ask a math problem"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          disabled={loading}
                          autoFocus
                          className="flex-grow bg-transparent border-none text-sm focus:outline-none placeholder:text-text-secondary/60"
                        />
                        {selectedFile && (
                          <div className="text-xs text-text-secondary px-2 py-1 bg-background-primary rounded-lg">
                            {selectedFile.name}
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={loading || !input.trim()}
                          className="p-2 rounded-full transition-all disabled:opacity-50 cursor-pointer"
                          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                        >
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="conversation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Message List (Add padding bottom for mobile fixed input) */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin pb-20 md:pb-24">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} px-2 md:px-6`}
                        >
                          <div
                            className={`max-w-[90%] md:max-w-[80%] rounded-2xl p-3 md:p-5 transition-all shadow-sm ${
                              msg.role === 'user'
                                ? 'bg-[var(--accent)] text-[var(--accent-text)] rounded-tr-sm'
                                : 'bg-background-secondary border border-border-custom rounded-tl-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2 text-xs font-semibold opacity-70">
                              {msg.role === 'user' ? (
                                <span>You</span>
                              ) : (
                                <>
                                  <div
                                    className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs"
                                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                                  >
                                    M
                                  </div>
                                  <span>MatAI</span>
                                </>
                              )}
                            </div>
                            {msg.role === 'bot' && msg.id !== 'welcome' ? (
                              <div className="text-sm leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: msg.content }}></div>
                                <button
                                  onClick={() => addBookmarkItem('solution', `Solution: ${msg.rawQuery}`, msg.rawQuery)}
                                  className="mt-3 text-xs text-text-secondary hover:text-[var(--accent)] flex items-center gap-1 cursor-pointer"
                                >
                                  <Bookmark size={11} />
                                  <span>{t('saveBookmark')}</span>
                                </button>
                              </div>
                            ) : (
                              <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.content }}></div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      {loading && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start px-2 md:px-6"
                        >
                          <div className="bg-background-secondary border border-border-custom rounded-2xl rounded-tl-sm p-3 md:p-5 space-y-3 shadow-sm">
                            <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary mb-2">
                              <div
                                className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs"
                                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                              >
                                M
                              </div>
                              <span>MatAI is thinking...</span>
                            </div>
                            <div className="flex gap-2">
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                                className="w-2 h-2 rounded-full bg-[var(--accent)]"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                                className="w-2 h-2 rounded-full bg-[var(--accent)]"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                                className="w-2 h-2 rounded-full bg-[var(--accent)]"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Desktop Bottom Fixed Input */}
                    <div className="hidden md:block fixed bottom-0 left-64 right-80 z-20 bg-background-primary border-t border-border-custom p-3 md:p-5">
                      <form onSubmit={handleSend} className="flex gap-2 md:gap-3 items-center max-w-4xl mx-auto px-1">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={handleFileClick}
                          className="p-2 rounded-xl text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          <Paperclip size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={handleVoiceClick}
                          className="p-2 rounded-xl text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          <Mic size={20} />
                        </button>
                        <input
                          type="text"
                          placeholder={t('askPlaceholder')}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          disabled={loading}
                          className="flex-grow px-3 md:px-5 py-2.5 md:py-3 rounded-2xl border border-border-custom bg-background-primary text-sm focus:outline-none focus:border-[var(--accent)] transition-all placeholder:text-text-secondary/60"
                        />
                        {selectedFile && (
                          <div className="text-xs text-text-secondary px-2 py-1 bg-background-primary rounded-lg border border-border-custom">
                            {selectedFile.name}
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={loading || !input.trim()}
                          className="p-2.5 md:p-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                        >
                          <ArrowRight size={18} />
                        </button>
                      </form>
                      <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center mt-3 px-2">
                        {quickChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => setInput(chip + " ")}
                            className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-background-primary hover:bg-border-custom/40 border border-border-custom transition-all text-[10px] md:text-[11px] font-medium text-text-secondary hover:text-text-primary cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Fixed Bottom Input (Conversation Mode) */}
                    <form
                      onSubmit={handleSend}
                      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background-primary/80 backdrop-blur-md border-t border-border-custom p-3"
                    >
                      <div className="max-w-2xl mx-auto flex items-center gap-2 bg-background-secondary rounded-full px-4 py-3 shadow-sm">
                        <button
                          type="button"
                          onClick={handleFileClick}
                          className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          <Paperclip size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={handleVoiceClick}
                          className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          <Mic size={18} />
                        </button>
                        <input
                          type="text"
                          placeholder="Ask a math problem"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          disabled={loading}
                          className="flex-grow bg-transparent border-none text-sm focus:outline-none placeholder:text-text-secondary/60"
                        />
                        {selectedFile && (
                          <div className="text-xs text-text-secondary px-2 py-1 bg-background-primary rounded-lg">
                            {selectedFile.name}
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={loading || !input.trim()}
                          className="p-2 rounded-full transition-all disabled:opacity-50 cursor-pointer"
                          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                        >
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* B. EXPLORE VIEW */}
          {activeView === 'explore' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="flex items-center space-x-2 bg-background-secondary border border-border-custom px-3 py-2 rounded-xl">
                <Search size={14} className="text-text-secondary" />
                <input type="text" placeholder={t('searchTopics')} value={exploreSearch} onChange={(e) => setExploreSearch(e.target.value)} className="flex-grow bg-transparent border-none text-xs p-0 text-text-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">{t('trendingTopics')}</h3>
                  <div className="space-y-2">
                    {trendingTopics.filter(t2 => t2.name.toLowerCase().includes(exploreSearch.toLowerCase())).map((topic, idx) => (
                      <div key={idx} className="p-3 border border-border-custom rounded-xl bg-background-secondary space-y-1">
                        <span className="font-bold text-xs text-text-primary">{topic.name}</span>
                        <p className="text-[10px] text-text-secondary">{topic.desc}</p>
                        <button onClick={() => { setActiveView('chat'); submitQuery(topic.query); }} className="text-[10px] font-bold flex items-center space-x-0.5 hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}>
                          <span>{t('trySolving')}</span><ArrowRight size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">{t('popularProblems')}</h3>
                  <div className="space-y-2">
                    {popularProblems.filter(p => p.text.toLowerCase().includes(exploreSearch.toLowerCase())).map((prob, idx) => (
                      <div key={idx} className="p-3 border border-border-custom rounded-xl bg-background-primary flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-mono text-xs font-semibold">{prob.text}</span>
                          <div className="flex space-x-2">
                            <span className="text-[9px] text-text-secondary bg-background-secondary px-1.5 py-0.5 rounded">{prob.category}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>{prob.difficulty}</span>
                          </div>
                        </div>
                        <button onClick={() => { setActiveView('chat'); submitQuery(prob.text); }} className="px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>{t('solve')}</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-border-custom">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">{t('learningPaths')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {learningPaths.map((path, idx) => (
                    <div key={idx} className="p-4 border border-border-custom bg-background-secondary rounded-2xl space-y-3">
                      <div className="flex justify-between items-start"><span className="font-bold text-sm">{path.name}</span><span className="text-[9px] text-text-secondary bg-background-primary px-1.5 py-0.5 rounded">{path.count}</span></div>
                      <div className="flex flex-wrap gap-1">{path.path.map((item, pIdx) => (<span key={pIdx} className="text-[8px] border border-border-custom bg-background-primary px-1.5 py-0.5 rounded">{item}</span>))}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono text-text-secondary"><span>Progress</span><span>{path.progress}</span></div>
                        <div className="w-full bg-border-custom rounded-full h-1"><div className="h-1 rounded-full" style={{ width: path.progress, backgroundColor: 'var(--accent)' }}></div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* C. PROBLEMS VIEW */}
          {activeView === 'problems' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow flex items-center space-x-2 bg-background-secondary border border-border-custom px-3 py-2 rounded-xl">
                  <Search size={14} className="text-text-secondary" />
                  <input type="text" placeholder={t('searchProblems')} value={problemsSearch} onChange={(e) => setProblemsSearch(e.target.value)} className="flex-grow bg-transparent border-none text-xs p-0" />
                </div>
                <select value={problemsFilterCategory} onChange={(e) => setProblemsFilterCategory(e.target.value)} className="p-2 text-xs rounded-xl border border-border-custom bg-background-primary">
                  <option value="all">{t('all')}</option><option value="Algebra">{t('algebra')}</option><option value="Calculus">{t('calculus')}</option><option value="Linear Algebra">{t('linearAlgebra')}</option><option value="Differential Equations">Differential Equations</option>
                </select>
                <select value={problemsFilterDifficulty} onChange={(e) => setProblemsFilterDifficulty(e.target.value)} className="p-2 text-xs rounded-xl border border-border-custom bg-background-primary">
                  <option value="all">{t('all')}</option><option value="Basic">{t('basic')}</option><option value="Intermediate">{t('intermediate')}</option><option value="Advanced">{t('advanced')}</option>
                </select>
              </div>
              <div className="space-y-2">
                {popularProblems.filter(p => { const ms = p.text.toLowerCase().includes(problemsSearch.toLowerCase()); const mc = problemsFilterCategory === 'all' || p.category === problemsFilterCategory; const md = problemsFilterDifficulty === 'all' || p.difficulty === problemsFilterDifficulty; return ms && mc && md; }).map((prob, idx) => (
                  <div key={idx} className="p-4 border border-border-custom bg-background-secondary rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-semibold text-text-primary block">{prob.text}</span>
                      <div className="flex space-x-2">
                        <span className="text-[9px] text-text-secondary bg-background-primary px-2 py-0.5 rounded border border-border-custom">{prob.category}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>{prob.difficulty}</span>
                      </div>
                    </div>
                    <button onClick={() => { setActiveView('chat'); submitQuery(prob.text); }} className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>{t('solveProblem')}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* D. HISTORY VIEW */}
          {activeView === 'history' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="flex gap-3 items-center">
                <div className="flex-grow flex items-center space-x-2 bg-background-secondary border border-border-custom px-3 py-2 rounded-xl">
                  <Search size={14} className="text-text-secondary" /><input type="text" placeholder={t('searchHistory')} value={historySearch} onChange={(e) => setHistorySearch(e.target.value)} className="flex-grow bg-transparent border-none text-xs p-0" />
                </div>
                <button onClick={() => setHistorySortAsc(!historySortAsc)} className="px-3 py-2 rounded-xl border border-border-custom bg-background-primary text-xs font-semibold hover:bg-background-secondary transition-all cursor-pointer">{t('sort')}: {historySortAsc ? t('oldest') : t('newest')}</button>
              </div>
              <div className="space-y-2">
                {historyList.filter(h => h.query.toLowerCase().includes(historySearch.toLowerCase())).sort((a, b) => { const diff = new Date(b.date) - new Date(a.date); return historySortAsc ? -diff : diff; }).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map((session) => (
                  <div key={session.id} className="p-3 border border-border-custom bg-background-secondary rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1"><div className="flex items-center space-x-2"><span className="font-semibold text-xs text-text-primary">{session.title}</span>{session.pinned && <span className="text-[8px] font-mono bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">{t('pinned')}</span>}</div><span className="text-[9px] text-text-secondary block font-mono">{new Date(session.date).toLocaleString()}</span></div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setHistoryList(prev => prev.map(h => h.id === session.id ? { ...h, pinned: !h.pinned } : h))} className="p-1.5 rounded hover:bg-background-primary text-text-secondary cursor-pointer"><Bookmark size={12} className={session.pinned ? 'fill-yellow-500 text-yellow-500' : ''} /></button>
                      <button onClick={() => { setActiveView('chat'); submitQuery(session.query); }} className="px-2.5 py-1 rounded border border-border-custom bg-background-primary text-[10px] font-bold cursor-pointer">{t('reopen')}</button>
                      <button onClick={() => setHistoryList(prev => prev.filter(h => h.id !== session.id))} className="p-1.5 rounded hover:bg-red-50 text-red-500 cursor-pointer"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* E. BOOKMARKS VIEW */}
          {activeView === 'bookmarks' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow flex items-center space-x-2 bg-background-secondary border border-border-custom px-3 py-2 rounded-xl"><Search size={14} className="text-text-secondary" /><input type="text" placeholder={t('searchBookmarks')} value={bookmarksSearch} onChange={(e) => setBookmarksSearch(e.target.value)} className="flex-grow bg-transparent border-none text-xs p-0" /></div>
                <select value={bookmarksCategory} onChange={(e) => setBookmarksCategory(e.target.value)} className="p-2 text-xs rounded-xl border border-border-custom bg-background-primary">
                  <option value="all">{t('all')}</option><option value="solution">{t('solutions')}</option><option value="graph">{t('graphs')}</option><option value="video">{t('videos')}</option><option value="explanation">{t('explanations')}</option>
                </select>
              </div>
              <div className="space-y-2">
                {bookmarksList.filter(b => { const ms = b.title.toLowerCase().includes(bookmarksSearch.toLowerCase()); const mc = bookmarksCategory === 'all' || b.type === bookmarksCategory; return ms && mc; }).map((book) => (
                  <div key={book.id} className="p-4 border border-border-custom bg-background-secondary rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1"><span className="font-semibold text-xs text-text-primary block">{book.title}</span><div className="flex space-x-2 font-mono text-[9px] text-text-secondary"><span className="bg-background-primary px-1.5 py-0.5 rounded border border-border-custom uppercase">{book.type}</span><span>Saved {book.date}</span></div></div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => { setActiveView('chat'); submitQuery(book.query); }} className="px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>{t('load')}</button>
                      <button onClick={() => removeBookmarkItem(book.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500 cursor-pointer"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* F. ACHIEVEMENTS VIEW */}
          {activeView === 'achievements' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="max-w-xl space-y-1"><h2 className="text-base font-bold">{t('achievements')}</h2><p className="text-xs text-text-secondary">Earn badges and XP rewards by solving equations and compiling animations.</p></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 border border-border-custom bg-background-secondary rounded-xl text-center space-y-0.5"><span className="text-lg font-bold">{statsProblemsSolved}</span><span className="text-[10px] font-mono text-text-secondary uppercase block">{t('problemsSolved')}</span></div>
                <div className="p-3 border border-border-custom bg-background-secondary rounded-xl text-center space-y-0.5"><span className="text-lg font-bold">{streak} days</span><span className="text-[10px] font-mono text-text-secondary uppercase block">{t('activeStreak')}</span></div>
                <div className="p-3 border border-border-custom bg-background-secondary rounded-xl text-center space-y-0.5"><span className="text-lg font-bold">{statsVisualsCount}</span><span className="text-[10px] font-mono text-text-secondary uppercase block">{t('graphsPlotted')}</span></div>
                <div className="p-3 border border-border-custom bg-background-secondary rounded-xl text-center space-y-0.5"><span className="text-lg font-bold">{statsVideosWatched}</span><span className="text-[10px] font-mono text-text-secondary uppercase block">{t('videosWatched')}</span></div>
              </div>
              <div className="space-y-3 pt-4 border-t border-border-custom">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary block font-mono">{t('unlockedBadges')}</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[{ title: "Algebra Novice", desc: "Solve 5 quadratic sums", progress: Math.min(statsProblemsSolved, 5), target: 5, reward: 100, icon: "🔢" },{ title: "Calculus Gladiator", desc: "Differentiate 10 systems", progress: Math.min(statsProblemsSolved, 10), target: 10, reward: 250, icon: "⚡" },{ title: "Visual Maestro", desc: "Plot 3 equations", progress: Math.min(statsVisualsCount, 3), target: 3, reward: 150, icon: "📊" },{ title: "Cinematic Scholar", desc: "Render 2 animations", progress: Math.min(statsVideosWatched, 2), target: 2, reward: 200, icon: "🎬" }].map((badge, idx) => {
                    const isCompleted = badge.progress >= badge.target;
                    return (
                      <div key={idx} className="p-4 border border-border-custom bg-background-secondary rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-background-primary flex items-center justify-center text-xl border border-border-custom">{badge.icon}</div>
                        <div className="flex-grow space-y-1">
                          <div className="flex justify-between items-start"><span className="font-bold text-xs">{badge.title}</span>{isCompleted ? <span className="text-[8px] font-mono text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">COMPLETED</span> : <span className="text-[9px] font-mono text-text-secondary">+{badge.reward} XP</span>}</div>
                          <p className="text-[10px] text-text-secondary">{badge.desc}</p>
                          <div className="space-y-1 pt-1.5">
                            <div className="w-full bg-border-custom h-1.5 rounded-full overflow-hidden"><div className="h-1.5 rounded-full" style={{ width: `${(badge.progress / badge.target) * 100}%`, backgroundColor: 'var(--accent)' }}></div></div>
                            <div className="flex justify-between text-[9px] font-mono text-text-secondary"><span>Progress</span><span>{badge.progress}/{badge.target}</span></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* G. ANALYTICS VIEW */}
          {activeView === 'analytics' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="max-w-xl space-y-1"><h2 className="text-base font-bold">{t('analytics')}</h2><p className="text-xs text-text-secondary">Comprehensive logs monitoring calculation speeds, accuracies, and coverage.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-border-custom bg-background-secondary rounded-2xl space-y-2"><div className="flex items-center justify-between"><span className="text-xs font-bold">{t('solvingAccuracy')}</span><TrendingUp size={14} className="text-green-500" /></div><span className="text-2xl font-bold font-mono tracking-tight block">96.4%</span><p className="text-[10px] text-text-secondary">Derived from 48 calculations with valid proofs.</p></div>
                <div className="p-4 border border-border-custom bg-background-secondary rounded-2xl space-y-2"><div className="flex items-center justify-between"><span className="text-xs font-bold">{t('topicCoverage')}</span><Activity size={14} className="text-blue-500" /></div><span className="text-2xl font-bold font-mono tracking-tight block">72.0%</span><p className="text-[10px] text-text-secondary">Topics: Calculus, Algebra, Matrices, Statistics.</p></div>
                <div className="p-4 border border-border-custom bg-background-secondary rounded-2xl space-y-2"><div className="flex items-center justify-between"><span className="text-xs font-bold">{t('studyDuration')}</span><Flame size={14} className="text-orange-500" /></div><span className="text-2xl font-bold font-mono tracking-tight block">14.5 hrs</span><p className="text-[10px] text-text-secondary">Cumulative across {streak} streak days.</p></div>
              </div>
              <div className="p-4 border border-border-custom bg-background-secondary rounded-2xl space-y-4">
                <span className="text-xs font-bold uppercase text-text-secondary tracking-wider block font-mono">{t('weeklyActivity')}</span>
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1.5 max-w-sm justify-center mx-auto">
                    {[0,2,4,1,0,3,5,1,0,2,0,4,1,3,0,1,3,5,2,0,4].map((val, idx) => {
                      let bg = 'bg-background-primary';
                      if (val === 1) bg = 'bg-zinc-200 dark:bg-zinc-800';
                      if (val === 2) bg = 'bg-zinc-300 dark:bg-zinc-700';
                      if (val === 3) bg = 'bg-zinc-400 dark:bg-zinc-600';
                      if (val >= 4) bg = ''; // use accent
                      return <div key={idx} className={`w-6 h-6 rounded border border-border-custom ${val < 4 ? bg : ''} hover:border-text-primary transition-all`} style={val >= 4 ? { backgroundColor: 'var(--accent)', opacity: val === 4 ? 0.6 : 1 } : {}} title={`${val} problems`} />;
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-text-secondary max-w-sm mx-auto font-mono"><span>{t('lessActive')}</span><span>{t('moreActive')}</span></div>
                </div>
              </div>
              <div className="p-4 border border-border-custom bg-background-secondary rounded-2xl space-y-3">
                <span className="text-xs font-bold uppercase text-text-secondary tracking-wider block font-mono">{t('topicMetrics')}</span>
                <div className="space-y-2">
                  {[{ topic: `${t('algebra')} (Equations)`, pct: 95 },{ topic: `${t('calculus')} (Derivatives)`, pct: 80 },{ topic: `${t('statistics')} & Probability`, pct: 90 },{ topic: `${t('linearAlgebra')} (Matrices)`, pct: 85 }].map((metric, idx) => (
                    <div key={idx} className="space-y-1"><div className="flex justify-between text-xs text-text-secondary font-mono"><span>{metric.topic}</span><span>{metric.pct}%</span></div><div className="w-full bg-background-primary h-2 rounded-full overflow-hidden border border-border-custom"><div className="h-2 rounded-full" style={{ width: `${metric.pct}%`, backgroundColor: 'var(--accent)' }}></div></div></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* H. PRACTICE VIEW */}
          {activeView === 'practice' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="max-w-xl space-y-1"><h2 className="text-base font-bold">{t('practiceTitle')}</h2><p className="text-xs text-text-secondary">Select a topic and difficulty, then generate practice questions to sharpen your skills.</p></div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-secondary tracking-wider block">{t('selectTopic')}</label>
                  <select value={practiceTopic} onChange={(e) => { setPracticeTopic(e.target.value); setPracticeQuestion(null); setPracticeResult(null); }} className="w-full p-2 text-xs rounded-xl border border-border-custom bg-background-primary">
                    <option value="algebra">{t('algebra')}</option><option value="calculus">{t('calculus')}</option><option value="trigonometry">{t('trigonometry')}</option><option value="statistics">{t('statistics')}</option><option value="linearAlgebra">{t('linearAlgebra')}</option>
                  </select>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-secondary tracking-wider block">{t('selectDifficulty')}</label>
                  <select value={practiceDifficulty} onChange={(e) => { setPracticeDifficulty(e.target.value); setPracticeQuestion(null); setPracticeResult(null); }} className="w-full p-2 text-xs rounded-xl border border-border-custom bg-background-primary">
                    <option value="easy">{t('basic')}</option><option value="medium">{t('intermediate')}</option><option value="hard">{t('advanced')}</option>
                  </select>
                </div>
              </div>
              <button onClick={generatePracticeQuestion} className="px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>{t('generateQuestion')}</button>
              {practiceQuestion && (
                <div className="border border-border-custom rounded-2xl p-4 md:p-6 bg-background-secondary space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-text-secondary uppercase">Question:</span>
                    <p className="text-sm font-bold font-mono text-text-primary">{practiceQuestion.q}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input type="text" placeholder={t('yourAnswer')} value={practiceAnswer} onChange={(e) => setPracticeAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkPracticeAnswer()} className="flex-grow px-3 py-2 rounded-xl border border-border-custom bg-background-primary text-xs" />
                    <button onClick={checkPracticeAnswer} className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>{t('checkAnswer')}</button>
                  </div>
                  {practiceResult !== null && (
                    <div className={`p-3 rounded-xl text-xs font-semibold ${practiceResult ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200 dark:border-green-900' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900'}`}>
                      {practiceResult ? t('correct') : `${t('incorrect')} Answer: ${practiceQuestion.a}`}
                    </div>
                  )}
                  <div className="text-[10px] text-text-secondary"><span className="font-semibold">Hint:</span> {practiceQuestion.hint}</div>
                </div>
              )}
            </div>
          )}

          {/* I. FORMULA SHEET VIEW */}
          {activeView === 'formula sheet' && (
            <div className="p-4 md:p-6 space-y-6 animate-fade-in">
              <div className="max-w-xl space-y-1"><h2 className="text-base font-bold">{t('formulaSheetTitle')}</h2><p className="text-xs text-text-secondary">Quick reference formulas organized by mathematical category.</p></div>
              <div className="flex flex-wrap gap-2">
                {['algebra', 'trigonometry', 'calculus', 'statistics', 'linearAlgebra'].map((cat) => (
                  <button key={cat} onClick={() => setFormulaCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${formulaCategory === cat ? '' : 'text-text-secondary bg-background-secondary border border-border-custom hover:text-text-primary'}`}
                    style={formulaCategory === cat ? { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' } : {}}
                  >{t(cat)}</button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formulaData[formulaCategory] || []).map((f, idx) => (
                  <div key={idx} className="p-4 border border-border-custom bg-background-secondary rounded-2xl space-y-2">
                    <span className="font-bold text-xs text-text-primary">{f.name}</span>
                    <div className="p-3 rounded-lg bg-background-primary border border-border-custom font-mono text-sm text-text-primary tracking-wide">{f.formula}</div>
                    <button onClick={() => { setActiveView('chat'); submitQuery(f.formula); }} className="text-[10px] font-bold flex items-center space-x-1 cursor-pointer" style={{ color: 'var(--accent)' }}>
                      <span>{t('trySolving')}</span><ArrowRight size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* COLUMN 3: OUTPUT WORKSPACE */}
      <AnimatePresence>
        {/* Show always on desktop (md+), conditionally on mobile */}
        <section className="hidden md:flex md:flex-col md:w-96 md:h-screen md:flex-shrink-0 md:bg-background-secondary md:select-none">
          {/* Desktop Right Panel Header */}
          <header className="p-3 border-b border-border-custom flex space-x-1.5 justify-between bg-background-primary">
            {['solution', 'video', 'visualization', 'notes'].map((tab) => (
              <button key={tab} onClick={() => setActiveOutputTab(tab)}
                className={`flex-1 text-center py-1.5 rounded-md text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${activeOutputTab === tab ? 'shadow-xs' : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'}`}
                style={activeOutputTab === tab ? { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' } : {}}
              >{tab}</button>
            ))}
          </header>
          <div className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-thin bg-background-primary/30">
            {/* Solution tab */}
            {activeOutputTab === 'solution' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><BookOpen size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('solutionSummary')}</span></div>
                {currentSolutionHtml ? (
                  <div className="bg-background-primary border border-border-custom p-4 rounded-xl text-xs leading-relaxed font-mono overflow-x-auto" dangerouslySetInnerHTML={{ __html: currentSolutionHtml }}></div>
                ) : (
                  <div className="text-center py-8 text-text-secondary text-xs">{t('noSolution')}</div>
                )}
                <div className="pt-4 border-t border-border-custom space-y-2">
                  <h4 className="text-[10px] font-bold uppercase text-text-secondary tracking-wider">{t('relatedConcepts')}</h4>
                  <div className="space-y-1">
                    {relatedConcepts.map((item, idx) => (
                      <button key={idx} onClick={() => { setActiveView('chat'); submitQuery(item.query); }} className="w-full flex items-center justify-between p-2 rounded-lg border border-border-custom bg-background-primary hover:bg-background-secondary text-xs text-text-secondary hover:text-text-primary transition-all text-left cursor-pointer">
                        <span className="truncate">{item.name}</span><ArrowRight size={11} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Video tab */}
            {activeOutputTab === 'video' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><Play size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('videoPlayer')}</span></div>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border-custom bg-black flex items-center justify-center">
                  {videoRendering && <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2 z-20"><div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin"></div><span className="text-[10px] font-mono text-white uppercase tracking-widest">RENDERING</span></div>}
                  {videoError && <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-4 text-center space-y-2 z-20 text-white"><AlertCircle className="text-red-500 w-8 h-8" /><span className="text-[10px] font-mono">Compiler error.</span><button onClick={() => setVideoError(false)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-[9px] font-mono cursor-pointer">Dismiss</button></div>}
                  <video ref={videoRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} className="w-full h-full object-contain" controls={false}>
                    <source src="/static/renders/videos/generated_scene/480p15/MyScene.mp4" type="video/mp4" />
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="border border-border-custom bg-background-secondary p-3 rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] font-mono text-text-secondary"><span>{formatTime(currentTime)} / {formatTime(duration || 60)}</span>
                    <select value={videoSpeed} onChange={handleSpeedChange} className="bg-transparent border border-border-custom rounded px-1.5 py-0.5 text-[9px] font-mono">
                      <option value={0.5}>0.5x</option><option value={1.0}>1.0x</option><option value={1.5}>1.5x</option><option value={2.0}>2.0x</option>
                    </select>
                  </div>
                  <input type="range" min={0} max={duration || 60} value={currentTime} onChange={(e) => { const v = parseFloat(e.target.value); if (videoRef.current) { videoRef.current.currentTime = v; setCurrentTime(v); } }} className="w-full h-1 bg-border-custom rounded-lg appearance-none cursor-pointer" />
                  <div className="flex gap-2">
                    <button onClick={handlePlayPause} className="flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 cursor-pointer" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>
                      {isPlaying ? <Pause size={12} /> : <Play size={12} />}<span>{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <button onClick={() => addBookmarkItem('video', `Video: ${currentQuery}`, currentQuery)} className="p-2 border border-border-custom bg-background-primary hover:bg-background-secondary rounded-lg text-text-secondary hover:text-text-primary transition-all cursor-pointer"><Bookmark size={12} /></button>
                    <a href="/static/renders/videos/generated_scene/480p15/MyScene.mp4" download className="px-3 rounded-lg border border-border-custom bg-background-primary hover:bg-background-secondary flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"><Download size={12} /></a>
                  </div>
                </div>
              </div>
            )}

            {/* Visualization tab */}
            {activeOutputTab === 'visualization' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><Layers size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('visualization')}</span></div>
                {currentQuery ? (
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-text-secondary">FUNCTION PLOT: f(x) for {currentQuery}</span>
                    <MathGraphPlotter query={currentQuery} />
                    <button onClick={() => addBookmarkItem('graph', `Graph: ${currentQuery}`, currentQuery)} className="text-[10px] font-mono text-text-secondary hover:text-text-primary flex items-center space-x-1 hover:underline cursor-pointer"><Bookmark size={11} /><span>Save Graph</span></button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-secondary text-xs">{t('noGraph')}</div>
                )}
              </div>
            )}

            {/* Notes tab */}
            {activeOutputTab === 'notes' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><Bookmark size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('notes')}</span></div>
                <div className="space-y-2">
                  <div className="p-3 border border-border-custom rounded-xl bg-background-primary leading-normal text-xs text-text-secondary space-y-1"><div className="font-bold text-[10px] font-mono text-text-primary uppercase">{t('calculus')} Note</div><p>Polynomial tangent slopes indicate speed. Tangents are positive where slope is ascending, negative where descending, and zero at local extrema.</p></div>
                  <div className="p-3 border border-border-custom rounded-xl bg-background-primary leading-normal text-xs text-text-secondary space-y-1"><div className="font-bold text-[10px] font-mono text-text-primary uppercase">KaTeX Syntax</div><p>Always write vectors as \vec v and integral formulas with limits to guarantee alignment validation.</p></div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Mobile Right Panel (toggleable) */}
        {rightPanelOpen && (
          <motion.section
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen z-50 w-full bg-background-secondary select-none flex flex-col border-l border-border-custom md:hidden"
          >
            <header className="p-3 border-b border-border-custom flex space-x-1.5 justify-between items-center bg-background-primary">
              <button
                onClick={() => setRightPanelOpen(false)}
                className="p-2 rounded-lg hover:bg-background-secondary text-text-primary cursor-pointer"
              >
                <X size={18} />
              </button>
              {['solution', 'video', 'visualization', 'notes'].map((tab) => (
                <button key={tab} onClick={() => setActiveOutputTab(tab)}
                  className={`flex-1 text-center py-1.5 rounded-md text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${activeOutputTab === tab ? 'shadow-xs' : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'}`}
                  style={activeOutputTab === tab ? { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' } : {}}
                >{tab}</button>
              ))}
              <div className="w-10" /> {/* Spacer */}
            </header>
            <div className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-thin bg-background-primary/30">
              {/* Solution tab */}
              {activeOutputTab === 'solution' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><BookOpen size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('solutionSummary')}</span></div>
                  {currentSolutionHtml ? (
                    <div className="bg-background-primary border border-border-custom p-4 rounded-xl text-xs leading-relaxed font-mono overflow-x-auto" dangerouslySetInnerHTML={{ __html: currentSolutionHtml }}></div>
                  ) : (
                    <div className="text-center py-8 text-text-secondary text-xs">{t('noSolution')}</div>
                  )}
                  <div className="pt-4 border-t border-border-custom space-y-2">
                    <h4 className="text-[10px] font-bold uppercase text-text-secondary tracking-wider">{t('relatedConcepts')}</h4>
                    <div className="space-y-1">
                      {relatedConcepts.map((item, idx) => (
                        <button key={idx} onClick={() => { setActiveView('chat'); submitQuery(item.query); setRightPanelOpen(false); }} className="w-full flex items-center justify-between p-2 rounded-lg border border-border-custom bg-background-primary hover:bg-background-secondary text-xs text-text-secondary hover:text-text-primary transition-all text-left cursor-pointer">
                          <span className="truncate">{item.name}</span><ArrowRight size={11} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Video tab */}
              {activeOutputTab === 'video' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><Play size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('videoPlayer')}</span></div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border-custom bg-black flex items-center justify-center">
                    {videoRendering && <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2 z-20"><div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin"></div><span className="text-[10px] font-mono text-white uppercase tracking-widest">RENDERING</span></div>}
                    {videoError && <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-4 text-center space-y-2 z-20 text-white"><AlertCircle className="text-red-500 w-8 h-8" /><span className="text-[10px] font-mono">Compiler error.</span><button onClick={() => setVideoError(false)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-[9px] font-mono cursor-pointer">Dismiss</button></div>}
                    <video ref={videoRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} className="w-full h-full object-contain" controls={false}>
                      <source src="/static/renders/videos/generated_scene/480p15/MyScene.mp4" type="video/mp4" />
                      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="border border-border-custom bg-background-secondary p-3 rounded-xl space-y-3 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-text-secondary"><span>{formatTime(currentTime)} / {formatTime(duration || 60)}</span>
                      <select value={videoSpeed} onChange={handleSpeedChange} className="bg-transparent border border-border-custom rounded px-1.5 py-0.5 text-[9px] font-mono">
                        <option value={0.5}>0.5x</option><option value={1.0}>1.0x</option><option value={1.5}>1.5x</option><option value={2.0}>2.0x</option>
                      </select>
                    </div>
                    <input type="range" min={0} max={duration || 60} value={currentTime} onChange={(e) => { const v = parseFloat(e.target.value); if (videoRef.current) { videoRef.current.currentTime = v; setCurrentTime(v); } }} className="w-full h-1 bg-border-custom rounded-lg appearance-none cursor-pointer" />
                    <div className="flex gap-2">
                      <button onClick={handlePlayPause} className="flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 cursor-pointer" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}>
                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}<span>{isPlaying ? 'Pause' : 'Play'}</span>
                      </button>
                      <button onClick={() => addBookmarkItem('video', `Video: ${currentQuery}`, currentQuery)} className="p-2 border border-border-custom bg-background-primary hover:bg-background-secondary rounded-lg text-text-secondary hover:text-text-primary transition-all cursor-pointer"><Bookmark size={12} /></button>
                      <a href="/static/renders/videos/generated_scene/480p15/MyScene.mp4" download className="px-3 rounded-lg border border-border-custom bg-background-primary hover:bg-background-secondary flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"><Download size={12} /></a>
                    </div>
                  </div>
                </div>
              )}

              {/* Visualization tab */}
              {activeOutputTab === 'visualization' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><Layers size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('visualization')}</span></div>
                  {currentQuery ? (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-text-secondary">FUNCTION PLOT: f(x) for {currentQuery}</span>
                      <MathGraphPlotter query={currentQuery} />
                      <button onClick={() => addBookmarkItem('graph', `Graph: ${currentQuery}`, currentQuery)} className="text-[10px] font-mono text-text-secondary hover:text-text-primary flex items-center space-x-1 hover:underline cursor-pointer"><Bookmark size={11} /><span>Save Graph</span></button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-text-secondary text-xs">{t('noGraph')}</div>
                  )}
                </div>
              )}

              {/* Notes tab */}
              {activeOutputTab === 'notes' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-2 border-b border-border-custom pb-2"><Bookmark size={14} className="text-text-secondary" /><span className="font-bold text-xs uppercase tracking-wide">{t('notes')}</span></div>
                  <div className="space-y-2">
                    <div className="p-3 border border-border-custom rounded-xl bg-background-primary leading-normal text-xs text-text-secondary space-y-1"><div className="font-bold text-[10px] font-mono text-text-primary uppercase">{t('calculus')} Note</div><p>Polynomial tangent slopes indicate speed. Tangents are positive where slope is ascending, negative where descending, and zero at local extrema.</p></div>
                    <div className="p-3 border border-border-custom rounded-xl bg-background-primary leading-normal text-xs text-text-secondary space-y-1"><div className="font-bold text-[10px] font-mono text-text-primary uppercase">KaTeX Syntax</div><p>Always write vectors as \vec v and integral formulas with limits to guarantee alignment validation.</p></div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>


    </div>
  );
};

export default ChatWorkspace;