[Назад](../README.md)

## Краткое описание
Этот проект представляет собой Koa контроллер, который предоставляет API для получения различных финансовых данных о криптовалютных рынках. Функционал включает в себя получение данных рынков криптовалют, ранга капитализации рынка и данных графиков рынка биткоина.

## Подробное описание работы

### Получение данных графика рынка биткоина
Запрос к этому API, /api/charts/bitcoin, вернёт данные графика рынка биткоина. Данные возвращаются как массив массивов, каждый из которых содержит только строки и числа.
Пример ответа:
```js
[
  ["PAN0", 34573.50053343686],
  [1698868809338, 34514.2530416425],
  [1698872462328, 35112.29258839147]
]
```
Применяется GET запрос.

### Получение данных ранга капитализации рынка
Запрос к API - /api/charts/market-cap-rank, предоставляет данные о ранге капитализации рынка. Данные возвращаются как массив объектов, которые содержат свойства 'name' (строка) и 'weight' (число).
Пример ответа:
```js
[
  { name: "Aave ETH v1", weight: 1895.91 },
  { name: "Tether", weight: 0.99962 },
  { name: "Bitcoin", weight: 35396 }
]
```
Также применяется GET запрос.

### Получение данных рынка
Обращение к /api/charts/markets предоставляет данные рынка. Вы сохраните массив объектов, содержащих свойства 'name' (строка) и 'weight' (число).
Пример ответа:
```js
[
  { name: "Aave ETH v1", weight: 1895.91 },
  { name: "Tether", weight: 0.99962 },
  { name: "Bitcoin", weight: 35396 }
]
```
Запрос также осуществляется методом GET.

## Зависимости
Проект реализован на Koa.js, поэтому для работы с ним необходимо иметь установленное окружение Node.js на вашем компьютере.

Описание контроллера ConfigController в приложении на основе фреймворка Koa:

## Необходимые модули и зависимости:

- `router`: экземпляр Router из `@koa/router`, переданный как параметр в функцию `ConfigController`.
- `inject`: функция, импортированная из `../di.js`, для внедрения зависимостей.
- `SERVICES` и `ConfigService`: константы, определенные в вашем проекте.

## Функции и маршруты:

- `ConfigController`: это функция, которая принимает `router` в качестве аргумента. Данный контроллер добавляет маршруты в переданный маршрутизатор и внедряет нужные зависимости.
    - Объект `config` содержит конфигурацию диаграмм, внедренный через `ConfigService`.

- Метод `GET /api/config`: Этот маршрут возвращает конфигурацию диаграмм. Он обрабатывается с помощью анонимной функции обратного вызова, которая принимает контекст Koa `ctx` в качестве аргумента и возвращает конфигурацию диаграмм в теле ответа.

## Swagger

Swagger используется для документирования API. Здесь небольшой обзор того, как он работает:

- `@swagger`: Это JSDoc-тег, который указывает, что следующий код должен быть документирован с помощью Swagger.
- `/api/config`: Это маршрут, который документируется.
- `get`: Это HTTP-метод определенного маршрута.
- `summary`: Краткое описание функции API.
- `responses`: Ответы, которые ожидаются от API.
- `200`: Код статуса HTTP для успешного ответа.
- `description`: Описание того, что происходит при успешном ответе.
- `content`: Формат контента успешного ответа.
- `example`: Пример того, как будет выглядеть успешный ответ.

Чтобы просмотреть документацию Swagger, обычно вы открываете веб-приложение Swagger UI в браузере и указываете URL-адрес, по которому Swagger может найти ваш JSON или YAML файл с документацией (который обычно создается автоматически на основе вашего кода и комментариев Swagger).