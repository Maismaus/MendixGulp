Y:
set /p UserInputPath=Enter project directory: 
set /p UserInputPort=Enter port to listen to: 
cd documents/gulpwindows
gulp start --folder %UserInputPath% --port %UserInputPort%