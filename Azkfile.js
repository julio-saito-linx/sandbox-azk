systems({
  site1: {
    depends: [],
    image: {"docker": "azukiapp/node"},
    provision: [
      "npm install",
    ],
    workdir: "/azk/#{manifest.dir}/#{system.name}",
    shell: "/bin/bash",
    command: "npm start",
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}/#{system.name}': sync("./#{system.name}"),
      '/azk/#{manifest.dir}/#{system.name}/node_modules': persistent("./#{system.name}/node_modules"),
    },
    scalable: {"default": 1},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      http: "3000/tcp",
    },
    envs: {
      NODE_ENV: "dev",
      PORT: "3000",
    },
  },

  site2: {
    extends: 'site1',
    depends: ['site1'],
  },

  site3: {
    extends: 'site1'
  },
});
