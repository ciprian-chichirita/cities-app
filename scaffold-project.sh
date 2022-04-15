#!/bin/bash
echo 'create client project using create react app'
npx create-react-app@4.0.3 client --template typescript;
echo 'create server project using express-generator'
npx express-generator server --view=ejs --git;
