export default function commands(path, id) {
  return {
    cpp: `docker run --rm -m 64M --memory-swap 64M --name ${id} -v ${path}:/code -w /code cpp /bin/sh -c "g++ -Wall main.cpp -o a && ./a >&1 | tee"`,
    js: `docker run --rm -m 64M --memory-swap 64M --name ${id} -v ${path}:/code -w /code node:current-alpine3.15 /bin/sh -c "node main.js"`,
  };
}
