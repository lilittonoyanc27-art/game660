import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Գույների Փոփոխություն',
    description: 'Ո՞ր գույներն են փոխում իրենց վերջավորությունը:',
    explanationIntro: 'Իսպաներենում -o-ով վերջացող գույները փոխվում են -a-ի (արական/իգական), իսկ մյուսները (օրինակ՝ verde, azul) մնում են անփոփոխ:',
    exercises: [
      { 
        id: 'c1', 
        type: 'FIND_ALL', 
        instruction: 'Ընտրեք այն գույները, որոնք փոխում են վերջավորությունը (-o / -a)', 
        prompt: 'Ո՞ր գույներն են փոփոխական:', 
        target: '', 
        targets: ['Rojo', 'Amarillo', 'Blanco', 'Negro'],
        choices: ['Rojo', 'Verde', 'Azul', 'Amarillo', 'Gris', 'Blanco', 'Marrón', 'Negro'],
        translation: 'Rojo (Կարմիր), Amarillo (Դեղին), Blanco (Սպիտակ), Negro (Սև):' 
      },
      { id: 'c2', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'La mesa es ___ (Կարմիր).', target: 'roja', choices: ['rojo', 'roja'], translation: 'Սեղանը կարմիր է:' },
      { id: 'c3', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'El coche es ___ (Կապույտ).', target: 'azul', choices: ['azul', 'azula'], translation: 'Մեքենան կապույտ է (Azul-ը չի փոխվում):' },
      { id: 'c4', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'Las casas son ___ (Սպիտակ).', target: 'blancas', choices: ['blancos', 'blancas'], translation: 'Տները սպիտակ են:' },
      { id: 'c5', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'La manzana es ___ (Կանաչ).', target: 'verde', choices: ['verde', 'verda'], translation: 'Խնձորը կանաչ է:' },
      { id: 'c6', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'Los libros son ___ (Սև).', target: 'negros', choices: ['negros', 'negras'], translation: 'Գրքերը սև են:' },
      { id: 'c7', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'La flor es ___ (Դեղին).', target: 'amarilla', choices: ['amarillo', 'amarilla'], translation: 'Ծաղիկը դեղին է:' },
      { id: 'c8', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'El gato es ___ (Մոխրագույն).', target: 'gris', choices: ['gris', 'grisa'], translation: 'Կատուն մոխրագույն է:' },
      { id: 'c9', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'Las nubes son ___ (Սպիտակ).', target: 'blancas', choices: ['blancos', 'blancas'], translation: 'Ամպերը սպիտակ են:' },
      { id: 'c10', type: 'SELECT', instruction: 'Ընտրեք ճիշտ ձևը', prompt: 'La puerta es ___ (Շագանակագույն).', target: 'marrón', choices: ['marrón', 'marrona'], translation: 'Դուռը շագանակագույն է:' }
    ]
  },
  {
    id: 2,
    title: 'Խառնված Նախադասություններ',
    description: 'Կազմեք նախադասություններ գույների մասին:',
    explanationIntro: 'Հիշե՛ք նախադասության կառուցվածքը՝ Գոյական + Ser + Գույն:',
    exercises: [
      { id: 'c11', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Երկինքը կապույտ է:', target: 'El cielo es azul', scrambledWords: ['es', 'azul', 'El', 'cielo'], translation: 'El cielo es azul.' },
      { id: 'c12', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Խոտը կանաչ է:', target: 'La hierba es verde', scrambledWords: ['verde', 'es', 'hierba', 'La'], translation: 'La hierba es verde.' },
      { id: 'c13', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Արևը դեղին է:', target: 'El sol es amarillo', scrambledWords: ['amarillo', 'es', 'sol', 'El'], translation: 'El sol es amarillo.' },
      { id: 'c14', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Ձյունը սպիտակ է:', target: 'La nieve es blanca', scrambledWords: ['blanca', 'nieve', 'La', 'es'], translation: 'La nieve es blanca.' },
      { id: 'c15', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Գիշերը սև է:', target: 'La noche es negra', scrambledWords: ['negra', 'es', 'noche', 'La'], translation: 'La noche es negra.' },
      { id: 'c16', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Ծովը կապույտ է:', target: 'El mar es azul', scrambledWords: ['es', 'El', 'mar', 'azul'], translation: 'El mar es azul.' },
      { id: 'c17', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Լոլիկը կարմիր է:', target: 'El tomate es rojo', scrambledWords: ['es', 'rojo', 'El', 'tomate'], translation: 'El tomate es rojo.' },
      { id: 'c18', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Բանանը դեղին է:', target: 'El plátano es amarillo', scrambledWords: ['es', 'amarillo', 'El', 'plátano'], translation: 'El plátano es amarillo.' },
      { id: 'c19', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Կաթը սպիտակ է:', target: 'La leche es blanca', scrambledWords: ['blanca', 'es', 'La', 'leche'], translation: 'La leche es blanca.' },
      { id: 'c20', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Արջը շագանակագույն է:', target: 'El oso es marrón', scrambledWords: ['marrón', 'oso', 'El', 'es'], translation: 'El oso es marrón.' }
    ]
  },
  {
    id: 3,
    title: 'Գույների Տեսակավորում',
    description: 'Տեղադրե՛ք գույները ճիշտ զամբյուղների մեջ՝ ըստ սեռի:',
    explanationIntro: 'Այստեղ դուք պետք է տարբերեք արական (Masculino) և իգական (Femenino) ձևերը: Հիշե՛ք վերջավորությունները՝ -o (արական), -a (իգական):',
    exercises: [
      { id: 'c21', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Roja', target: 'Femenino', choices: ['Masculino', 'Femenino'], translation: 'Կարմիր (Իգական)' },
      { id: 'c22', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Rojo', target: 'Masculino', choices: ['Masculino', 'Femenino'], translation: 'Կարմիր (Արական)' },
      { id: 'c23', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Blanca', target: 'Femenino', choices: ['Masculino', 'Femenino'], translation: 'Սպիտակ (Իգական)' },
      { id: 'c24', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Blanco', target: 'Masculino', choices: ['Masculino', 'Femenino'], translation: 'Սպիտակ (Արական)' },
      { id: 'c25', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Negro', target: 'Masculino', choices: ['Masculino', 'Femenino'], translation: 'Սև (Արական)' },
      { id: 'c26', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Negra', target: 'Femenino', choices: ['Masculino', 'Femenino'], translation: 'Սև (Իգական)' },
      { id: 'c27', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Amarilla', target: 'Femenino', choices: ['Masculino', 'Femenino'], translation: 'Դեղին (Իգական)' },
      { id: 'c28', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Amarillo', target: 'Masculino', choices: ['Masculino', 'Femenino'], translation: 'Դեղին (Արական)' },
      { id: 'c29', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Rosado', target: 'Masculino', choices: ['Masculino', 'Femenino'], translation: 'Վարդագույն (Արական)' },
      { id: 'c30', type: 'SORT', instruction: 'Տեղադրե՛ք ճիշտ զամբյուղի մեջ', prompt: 'Rosada', target: 'Femenino', choices: ['Masculino', 'Femenino'], translation: 'Վարդագույն (Իգական)' }
    ]
  }
];

export const VOCABULARY = [
  { id: 'v1', es: 'Rojo', hy: 'Կարմիր' },
  { id: 'v2', es: 'Azul', hy: 'Կապույտ' },
  { id: 'v3', es: 'Verde', hy: 'Կանաչ' },
  { id: 'v4', es: 'Amarillo', hy: 'Դեղին' },
  { id: 'v5', es: 'Blanco', hy: 'Սպիտակ' },
];
