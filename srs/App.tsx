import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, Gavel, Users, Home, ExternalLink } from 'lucide-react';

interface Rule {
  id: string;
  title: string;
  content: string[];
  subcategories?: { title: string; content: string; }[];
}

const rules: Rule[] = [
  {
    id: '1',
    title: 'Запрещено использование читов и модификаций',
    content: [
      'Использование любых программ или модификаций, дающих преимущество над другими игроками привет к блокировке.',
      'Незнание правил не освобождает от ответственности.'
    ]
  },
  {
    id: '2', 
    title: 'Запрещено разрушение чужих построек (гриферство)',
    content: [
      'Нельзя - убивать чужих питомцев, воровать или каким-либо образом вмешиваться в чужие постройки без разрешения владельца.'
    ],
    subcategories: [
      { title: '2.1 DM - Убийство без причины:', content: 'Убийство человека без весомой на то причины запрещается.' },
      { title: '2.2 NSFW:', content: 'Запрещенна строительство построек сексуального характера.' }
    ]
  },
  {
    id: '3',
    title: 'Строго запрещено использование багов и эксплойтов',
    content: [
      'Использование багов игры для получения преимуществ.'
    ],
    subcategories: [
      { title: '3.1 Любые аналоги X-Ray:', content: 'Запрещенно использование эксплойтов чанков и шейдеров для виденья игроков, мобов, и данжев.' },
      { title: '3.2 Дюп:', content: 'Запрещенно дюпать те или иные ресурсы в огромном каличестве: Постройка автономных механизмов, дюпающих в огромном каличестве изумруды' },
      { title: '3.3 Запрещенно намеренное нагружение сервера/DDoS:', content: 'Намеренное использование прогрузки чанков в большом каличестве, за короткий промежуток времени а также запрещенно строительство ферм которые слишком нагружают сервер.' },
      { title: '3.4 Запрещается любым способом находить сид:', content: 'Запрещается любым способом находить сид и/или распространнять его, за это будет вынесено наказание.' }
    ]
  },
  {
    id: '4',
    title: 'Соблюдение честной торговли и обмена',
    content: [
      'Запрещены мошенничество и обман при торговле с другими игроками.'
    ],
    subcategories: [
      { title: '4.1 Запрещенны любые виды валюты:', content: 'Любые ресурсы на обмен исключение: Внутре-игровая волюта "АРы" (Алмазная руда либо глубинносланцевая).' }
    ]
  },
  {
    id: '5',
    title: 'Уважение к территории других игроков',
    content: [
      'Не стройте слишком близко к чужим постройкам без согласования с владельцем, минимальная дистанция 100 блоков от терретории соседа.'
    ],
    subcategories: [
      { title: '5.1 Запрещенно находится на чужой територии:', content: 'Без согласия владельца' },
      { title: '5.2 Разрешенно строительство на чужой територии:', content: 'Границ с разрешения владельца.' }
    ]
  },
  {
    id: '6',
    title: 'Уважение к общественным зонам',
    content: [
      'Не засоряйте и не разрушайте общественные зоны, такие как спавн, торговые площади и т.д.'
    ]
  },
  {
    id: '7',
    title: 'MultiAcount',
    content: [
      'Запрещенно заходить через аккаунты других игроков (Другие аккаунты)'
    ]
  },
  {
    id: '8',
    title: 'Запрещенно оскарбление Администрации',
    content: [
      'Запрещенно оскарбление Администрации в любой форме и в любое время.'
    ],
    subcategories: [
      { title: '8.1 Администрация всегда права:', content: 'Приговор обжалованию не подлежит кроме редких случаев, не нужно писать жалобу по каждому поводу, только если адмнистратор вынесет неверный приговор либо неверное наказание.' },
      { title: '8.2 Запрещенно унижать расовые меньшинства:', content: 'Розжигать межнациональные розни.' },
      { title: '8.3 Зарещенна любая пропаганда нацизма:', content: 'В любом виде или форме.' },
      { title: '8.4 Запрещенно распростронять:', content: 'Любые политические взгляды.' }
    ]
  }
];

const punishments = [
  {
    category: '1. Использование читов и модификаций',
    penalty: 'Первое нарушение: Перманентный бан без возможности восстановления.'
  },
  {
    category: '2. Разрушение чужих построек (гриферство)',
    penalty: 'Первое нарушение: Бан на 3 часа.\nВторое нарушение: Бан на 12 часов.\nТретье нарушение: Бан на сутки(24 часа).\nЧётверное нарушение: бан на неделю.\nПятное нарушение: Перманентный бан.'
  },
  {
    category: '3. Использование багов и эксплойтов',
    penalty: 'Первое нарушение: Бан на 3 часа.\nВторое нарушение: Бан на 6 часов.\nТретье нарушение: Перманентный бан.'
  },
  {
    category: '3.1 Аналоги X-Ray',
    penalty: 'Первое нарушение: Бан на 1 день.\nВторое нарушение: Перманентный бан.'
  },
  {
    category: '3.2 Дюп',
    penalty: 'Первое нарушение: Бан на 1 день.\nВторое нарушение: Перманентный бан.'
  },
  {
    category: '4. Мошенничество в торговле',
    penalty: 'Первое нарушение: Бан на 3 часа и возврат ресурсов пострадавшему игроку.\nВторое нарушение: Бан на 6 часов.'
  },
  {
    category: '4.1 Запрещено создание собственной валюты',
    penalty: 'Первое нарушение: Изъятие созданной валюты и предупреждение.\nВторое нарушение: Бан на 6 часов и изъятие валюты.'
  },
  {
    category: '5. Уважение к территории других игроков',
    penalty: 'Первое нарушение: Бан на 3 часа и снос постройки.\nВторое нарушение: Бан на 6 часов и снос постройки.'
  },
  {
    category: '6. Уважение к общественным зонам',
    penalty: 'Первое нарушение: Предупреждение.\nВторое нарушение: Бан на 3 часа.'
  },
  {
    category: '7. MultiAcount',
    penalty: 'Первое нарушение: бан по айпи на 6 часа.\nВторое нарушение: бан по айпи на 13 часов.\nТретье нарушение: бан по айпи навсегда.'
  },
  {
    category: '8. Оскорбление администрации',
    penalty: 'Первое нарушение: Бан на 2 часа.\nВторое нарушение: Бан на 4 часов.'
  },
  {
    category: '8.1 Написание жалобы без причины',
    penalty: 'Первое нарушение: Предупреждение.\nВторое нарушение: Бан на 1 день.'
  },
  {
    category: '8.2, 8.3, 8.4 - Политика и розжиг',
    penalty: 'Первое нарушение: Бан на 1 день.\nВторое нарушение: Бан на Неделю.\nТретье нарушение: Перманентный бан.'
  }
];

const adminTeam = [
  { name: 'NniD1', role: 'Владелец', color: 'text-cyan-300' },
  { name: 'tempel', role: 'Администратор', color: 'text-blue-300' },
  { name: 'Bs_plodiy_kid', role: 'Модератор', color: 'text-sky-300' },
  { name: 'ya_zoha', role: 'Модератор', color: 'text-sky-300' },
  { name: 'ByT1lo4ka', role: 'Мл. модератор', color: 'text-indigo-300' },
  { name: 'stecish20', role: 'Мл. модератор', color: 'text-indigo-300' }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set());

  const toggleRule = (ruleId: string) => {
    const newExpanded = new Set(expandedRules);
    if (newExpanded.has(ruleId)) {
      newExpanded.delete(ruleId);
    } else {
      newExpanded.add(ruleId);
    }
    setExpandedRules(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-blue-100">
      {/* Header */}
      <header className="border-b border-blue-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-blue-900/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              MineTerru
            </h1>
            <div className="text-right">
              <div className="text-xl font-semibold text-cyan-400">5 Season</div>
              <div className="text-sm text-blue-300">Ancient City Style</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/80 backdrop-blur-sm sticky top-[73px] z-40 border-b border-blue-700/50 shadow-lg shadow-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'home', label: 'Главная', icon: Home },
              { id: 'rules', label: 'Правила', icon: Shield },
              { id: 'punishments', label: 'Наказания', icon: Gavel },
              { id: 'admin', label: 'Администрация', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-300 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                      : 'border-transparent text-blue-200 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-blue-800/30'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-6 shadow-2xl shadow-cyan-500/30">
                <div className="bg-slate-900 rounded-full p-8">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4">
                    Добро пожаловать!
                  </h2>
                  <p className="text-xl text-blue-200 leading-relaxed">
                    Присоединяйтесь к нашему сообществу в пятом сезоне сервера MineTerru.
                    <br />
                    Исследуйте древние города, стройте великие сооружения и создавайте свою историю!
                  </p>
                </div>
              </div>
            </div>

            {/* Discord Section */}
            <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-8 border border-blue-500/30 mb-8 shadow-xl shadow-blue-900/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">
                  Присоединяйтесь к нашему Discord серверу!
                </h3>
                <p className="text-blue-200 mb-6">
                  Общайтесь с другими игроками, получайте последние новости и участвуйте в событиях.
                </p>
                <a
                  href="https://discord.gg/m49Ksb4ByM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-600/30"
                >
                  <ExternalLink size={20} />
                  <span>Присоединиться к Discord</span>
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-600/30 hover:border-cyan-400/50 transition-all duration-200 shadow-lg shadow-blue-900/20">
                <div className="text-cyan-400 mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Честная игра</h3>
                <p className="text-blue-200">
                  Строгие правила против читов и нечестной игры обеспечивают равные условия для всех.
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-600/30 hover:border-cyan-400/50 transition-all duration-200 shadow-lg shadow-blue-900/20">
                <div className="text-cyan-400 mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Сообщество</h3>
                <p className="text-blue-200">
                  Дружелюбное сообщество игроков и опытная команда администрации.
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-600/30 hover:border-cyan-400/50 transition-all duration-200 shadow-lg shadow-blue-900/20">
                <div className="text-cyan-400 mb-4">
                  <Gavel size={32} />
                </div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Справедливость</h3>
                <p className="text-blue-200">
                  Четкая система наказаний и справедливое разрешение конфликтов.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cyan-300 mb-4">Правила сервера</h2>
              <p className="text-blue-200">
                Ознакомьтесь с правилами для комфортной игры на нашем сервере
              </p>
            </div>

            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="bg-slate-800/50 rounded-xl border border-blue-600/30 overflow-hidden shadow-lg shadow-blue-900/20">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-800/30 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-cyan-500 text-slate-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg shadow-cyan-500/30">
                        {rule.id}
                      </div>
                      <h3 className="text-lg font-semibold text-cyan-300">{rule.title}</h3>
                    </div>
                    {expandedRules.has(rule.id) ? (
                      <ChevronDown className="text-cyan-400" size={20} />
                    ) : (
                      <ChevronRight className="text-cyan-400" size={20} />
                    )}
                  </button>
                  
                  {expandedRules.has(rule.id) && (
                    <div className="px-6 pb-6 border-t border-blue-600/30">
                      <div className="pt-4 space-y-3">
                        {rule.content.map((content, index) => (
                          <p key={index} className="text-blue-200 leading-relaxed">
                            • {content}
                          </p>
                        ))}
                        
                        {rule.subcategories && (
                          <div className="mt-4 space-y-3">
                            {rule.subcategories.map((sub, index) => (
                              <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/30 shadow-lg shadow-blue-900/10">
                                <h4 className="text-blue-300 font-semibold mb-2">{sub.title}</h4>
                                <p className="text-blue-200">{sub.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'punishments' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">Система наказаний</h2>
              <p className="text-blue-200">
                Привет! Здесь представлена подробная информация о наказаниях за нарушение правил сервера.
                Мы стремимся поддерживать справедливую и дружелюбную атмосферу для всех игроков.
              </p>
            </div>

            <div className="space-y-6">
              {punishments.map((punishment, index) => (
                <div key={index} className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-xl p-6 border border-red-500/30 shadow-lg shadow-red-900/20">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">{punishment.category}</h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/20">
                    {punishment.penalty.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className="text-blue-200 mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6 shadow-lg shadow-yellow-900/20">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">Важная информация</h3>
              <ul className="text-blue-200 space-y-2">
                <li>• Все наказания выносятся после тщательного рассмотрения ситуации</li>
                <li>• При спорных ситуациях решение принимает администрация</li>
                <li>• Апелляции рассматриваются только в исключительных случаях</li>
                <li>• Незнание правил не освобождает от ответственности</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-purple-400 mb-4">Администрация сервера</h2>
              <p className="text-blue-200">
                Наша команда администрации работает 24/7 для обеспечения порядка и справедливости на сервере
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {adminTeam.map((admin, index) => (
                <div key={index} className="bg-gradient-to-r from-slate-800/50 to-blue-800/50 rounded-xl p-6 border border-blue-500/30 hover:border-cyan-400/50 transition-all duration-200 shadow-lg shadow-blue-900/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${admin.color}`}>
                        {admin.name}
                      </h3>
                      <p className="text-blue-300 font-medium">{admin.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 shadow-lg shadow-purple-900/20">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">Иерархия ролей</h3>
              <div className="space-y-2 text-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50"></div>
                  <span><strong className="text-cyan-300">Владелец</strong> - Полные права администрирования сервера</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-300 rounded-full shadow-lg shadow-blue-300/50"></div>
                  <span><strong className="text-blue-300">Администратор</strong> - Управление сервером и решение сложных вопросов</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-sky-300 rounded-full shadow-lg shadow-sky-300/50"></div>
                  <span><strong className="text-sky-300">Модератор</strong> - Поддержание порядка и применение наказаний</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-300 rounded-full shadow-lg shadow-indigo-300/50"></div>
                  <span><strong className="text-indigo-300">Младший модератор</strong> - Помощь игрокам и контроль чата</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-700/50 bg-slate-900/80 backdrop-blur-sm mt-16 shadow-lg shadow-blue-900/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">MineTerru 5 Season</h3>
            <p className="text-blue-300">
              © 2024 MineTerru Server. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
