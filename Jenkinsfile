pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
        stage('initialize modules') {
            steps {
                sh "ls"
                sh "ls quiz-frontend"
                sh "ls quiz-server"
                sh "npm install"
                dir ('quiz-frontend') { 
                    sh "npm install"
                }
                dir ('quiz-server') { 
                    sh "npm install"
                }
            }
        }
        stage('run unit tests') {
            steps {
                sh "npm run unit-test"
		junit skipPublishingChecks: true, testResults: 'reports/unit_tests.xml'
            }
        }
        stage('build server') {
            steps {
	    	sh "make clean"
                sh "make build"
            }
        }
        stage('run use cases') {
             steps {
                sh "npm install"
                sh '''#!/bin/bash
                    export PORT=$(comm -23 <(seq 49152 65535) <(ss -tan | awk '{print $4}' | cut -d':' -f2 | grep "[0-9]\\{1,5\\}" | sort | uniq) | shuf | head -n 1)
                    cd ./build
                    npm start & NODEID="$!"
                    cd ..
                    npm run use-case-test
                    RETVAL=$?
                    kill $NODEID
                    #exit $RETVAL
                '''
		junit skipPublishingChecks: true, testResults: 'reports/use_case_tests.xml'
		publishCoverage adapters: [cobertura('coverage/cobertura-coverage.xml')]
            }
        }
    }
} 
