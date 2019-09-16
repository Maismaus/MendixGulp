# MendixGulp
Gulpfile for Mendix with extra commands for a local installation of Gulp

## Why
To prevent having to reinstall Gulp every time you open a new project/switch projects, I prefer to install Gulp in a single directory which targets Mendix project directories. 

## Complete installation guide
* Download and install Node.js
* Download this Git project
* Place the downloaded files next to the Mendix project directory
I.e. if your Mendix project are located at: 
C:\documents\Mendix\YourProject
Then place files here:
C:\documents\Gulp\
* Run commands in cmd
cd C:\documents\Gulp
npm install gulp -g
npm install gulp
npm install
* Run RunGulp.bat
* Open localhost:3000

### Notes
Note that your Mendix project directories need to have easy to write names with this setup

### Troubleshooting
Something not working:
* After entering the details in the .bat file, it immediately closes
Gulp may not be installed correctly, try running gulp in cmd and see what error it gives you
* Did you enter the correct port?
* You can't see your changes appear?
If you change something in the style files, does Gulp rebuild (check the cmd screen where Gulp is running if it does something once you save)
If not, Gulp is watching the wrong directory
* localhost:3000 not opening?
Is your Mendix project actually running?
* Cannot find module gulp-sass
package.json may be missing