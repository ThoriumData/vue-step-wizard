

module.exports = {
    outputDir: "build",
    assetsDir: "assets",
    runtimeCompiler: true,
    lintOnSave: false,

    // modify the index.html's <title>
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "Wizard";
            return args;
        });

        // clear out the less rules in the hope that this will speed things up a tiny tiny bit
        const lessRules = config.module.rule("less");
        lessRules.uses.clear();
        lessRules.store.clear();
        lessRules.oneOfs.store.clear();

        // clear out the STYLUS rules in the hope that this will speed things up a tiny tiny bit
        const stylusRules = config.module.rule("stylus");
        stylusRules.uses.clear();
        stylusRules.store.clear();
        stylusRules.oneOfs.store.clear();

        // clear out the media rules in the hope that this will speed things up a tiny tiny bit
        const mediaRules = config.module.rule("media");
        mediaRules.uses.clear();
        mediaRules.store.clear();
        mediaRules.oneOfs.store.clear();
    },


    pluginOptions: {
    },
    css: {
        sourceMap: true,
    },
};
