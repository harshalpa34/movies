# Welcome to Movie Flex (Fancode)👋

## Tech Stack Used
   ### React Native
   ### Typescript
   
## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start

   suggested to test on android
      - Download expo add from play store
      - scan the QR code from terminal after running npm start
      - Make sure you are on same wifi on mobile and on your PC.

      if above steps don't work then please download android emulator in vs code from extensions and follow below steps

      -Press cltr + shift + p
      -type emulator and press enter
      -you will get the list of android emulator which you have download from extension click on that
      - press a in ternimal and it will open the app in emulator
   ```

## Features I have Implimented
   - Layout And UI
      - Created custom UI components for the app, React Native & TypeScript JavaScript library for reusability.
      - list of movies sorted in descending order of popularity.
      - Displaying movie title, image, genre, cast, director, and a short description related to the movie in each information card.
   - Default page load state
      - Loading a total of only 20 movies for each year
      - By default, when a user lands on the page, display a list of movies of the year 2012
      - Implemented smooth scrolling behavior to load more movies as the user scrolls in any direction i.e load movies of previous year when user scrolls up and load               movies of next year when user scrolls down until the current year.
      - Smooth Scrolling and inetraction
   - Genre Filter
      - Provide a filter UI that allows users to filter movies by genre.
   - Code Quality
       - Used React for making reusable components
       - Used Typescript for enhanced type safety and code quality.
