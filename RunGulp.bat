cd %~dp0
set /p UserInputPath=Enter project directory: 
set /p UserInputPort=Enter port to listen to: 
gulp start --folder %UserInputPath% --port %UserInputPort%