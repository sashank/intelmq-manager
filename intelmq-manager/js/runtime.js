function generate_runtime_conf(nodes) {
    var conf_string = '';
    var new_nodes = {};
    var save_keys = {};
    
    for (id in nodes) {
        var bot=nodes[id];
        save_keys[id] = {};
        
        for (index in STARTUP_KEYS) {
            save_keys[id][STARTUP_KEYS[index]] = bot[STARTUP_KEYS[index]];
            delete bot[STARTUP_KEYS[index]];
        }
        
        new_nodes[id] = save_keys[id];
        save_keys[id]['id'] = bot['id'];
        delete bot['id'];
        
        new_nodes[id] = bot;
    }
    
    conf_string = JSON.stringify(new_nodes, undefined, 4);

    for (id in nodes) {
        var bot=nodes[id];
        for (index in STARTUP_KEYS) {
            bot[STARTUP_KEYS[index]] = save_keys[id][STARTUP_KEYS[index]];
        }
        
        bot['id'] = save_keys[id]['id'];
    }
    
    return conf_string;
}

function read_runtime_conf(config) {
    var nodes = {};
    for (id in config) {
        var bot = config[id];
        bot['id'] = id;
        nodes[id] = bot;

        if (id in nodes) {
            nodes[id]['group'] = bot['group'];
            nodes[id]['name'] = bot['name'];
            nodes[id]['module'] = bot['module'];
            nodes[id]['description'] = bot['description'];
            nodes[id]['parameters'] = bot['parameters'];
        }
    }
    
    return nodes;
}
