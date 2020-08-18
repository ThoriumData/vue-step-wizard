// shared mixins
//

// RegisterStoreModule
// use to dynamically register a store module
// learned from: https://medium.com/@ariklevliber/vuex-next-steps-namespaces-and-dynamic-modules-92ea23a0ee9a

const RegisterStoreModule = {
    methods: {
        registerStoreModule(moduleName, storeModule) {
            const store = this.$store;
            if (!(store && store.state && store.state[moduleName])) {
                store.registerModule(moduleName, storeModule);
            }
        },
    },
};


export { RegisterStoreModule };
