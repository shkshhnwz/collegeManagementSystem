@echo off
rem Wrapper to invoke Apache Maven on Windows
setlocal
set "MAVEN_HOME=C:\Users\Shahnawaz Shaikh\.m2\wrapper\dists\apache-maven-3.10.1-bin\l3c9c5m756qjme56n7k20cfnr\apache-maven-3.10.1"
if exist "%MAVEN_HOME%\bin\mvn.cmd" (
    "%MAVEN_HOME%\bin\mvn.cmd" %*
) else (
    mvn %*
)
