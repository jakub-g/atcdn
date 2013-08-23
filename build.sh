#/bin/bash

atbuild(){
    git checkout v$1;
    mkdir -p ../atcdn/$1/{min,dev};
    npm run-script grunt;
    cp -R ./build/target/production/aria ../atcdn/$1/min/aria;
    cp -R ./src/aria ../atcdn/$1/dev/aria
}
atbuild $1