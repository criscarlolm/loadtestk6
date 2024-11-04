  pipeline {
    agent any

    stages {
        stage('Load Testing') {
            steps {
                echo 'Installing k6'
                sh 'set +e chmod +x setup_k6.sh'
                sh 'set +e ./setup_k6.sh'
                echo 'Running K6 load tests...'

                script {
                    def script_status = [:]
                    def scripts = ["TCM-6214.js","TCM-6215.js","TCM-6216.js","TCM-6217.js","TCM-6220.js","TCM-6221.js","TCM-6222.js","TCM-6223.js","TCM-6240.js","TCM-6241.js","TCM-6242.js","TCM-6243.js","TCM-6244.js","TCM-6245.js","TCM-6246.js","TCM-6247.js","TCM-6304.js","TCM-6334.js","TCM-6335.js","TCM-6336.js","TCM-6337.js","TCM-6338.js","TCM-6339.js","TCM-6340.js"]

                    for (def scriptFile in scripts) {
                        if (fileExists(scriptFile)) {
                            def result = sh returnStatus: true, script: "k6 run -o experimental-prometheus-rw ${scriptFile}"
                            check_exit_status result, scriptFile, script_status
                        } else {
                            echo "Script ${scriptFile} - Skipped (not found)"
                            script_status[scriptFile] = "Skipped"
                        }
                    }

                    echo "Script execution completed"
                    echo "Results:"
                    for (def scriptFile in script_status.keySet()) {
                        def status = script_status[scriptFile]
                        echo "${scriptFile} - ${status}"
                    }
                }
            }
        }
    }
}

def check_exit_status(exitCode, scriptFile, script_status) {
    if (exitCode != 0) {
        echo "Script ${scriptFile} - Failed"
        script_status[scriptFile] = "Failed"
    } else {
        echo "Script ${scriptFile} - Passed"
        script_status[scriptFile] = "Passed"
    }
}
