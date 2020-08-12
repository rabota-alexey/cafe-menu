# Меню (для мобильного телефона)

ТЗ по [макету](https://www.figma.com/file/1GuJr8Skjd4ucxcfYKHMdy/ERP---menu?node-id=0%3A1) из Figma для [Nomia](https://nomia.net/)

> Необходимо реализовать "меню каталога" на Angular. Меню состоит из разделов и позиций.  
> У каждого экрана должен быть свой route.  
> При первой загрузке брать данные из menu.json  
> Данные должны сохраняться в Local Storage.  
> Над версткой можно особо не заморачиваться.  

## Особенности реализации:
- основывается на препроцессоре Sass (SCSS)
- библиотека стилей [Tailwind CSS](https://tailwindcss.com/)
- Angular 10 с настроенным Webpack (custom-webpack)
- [PostCSS](https://postcss.org/) плагины для удобной работы со стилями Tailwind
- [class-transformer](https://github.com/typestack/class-transformer#readme) для корректной сериализации JSON в классы Typescript
- все иконки хранятся в одном файле [icons.svg](src/assets/images/icons.svg), а обращение к конкретной иконке идёт по id
- [JSON с данными](src/assets/menu.json) подтягивается с помощью Observable, а не простого import, как будто бы идёт обращение к API
- все манипуляции с данными (меню) происходят [в сервисе](src/services/menu.service.ts)
