function everything() {

const trigger = '%';
const version = 'V1.1.8';
const colorT = 0xffa500;
const colorV = 0x005682;

const config = require('../configVrisk.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
var exec = require('child_process').exec;
var sleep = 0;
var downshut = 0;
var datime = 'void';

var path = require('path');
var scriptName = path.basename(__filename); //writes name of JS file as scriptName

if(scriptName === 'buildT.js') {
    test = 1;
    color1 = colorT;
}
if(scriptName === 'buildV.js') {
    test = 0;
    color1 = colorV;
}



bot.on('message', (message) => {

    if(message.author.bot) {
        return;
    }
    
    var origmsg = message.content;
    message.content = message.content.toLowerCase();
    


    if(message.content.startsWith(trigger + 'wakeup')) {
         if(message.author.id === '193587165114925057') {
           sleep = 0
            message.channel.sendMessage('Wh... All right, all right, I\'m awake.');
             bot.user.setStatus('online');
            return;
        } else {
            message.reply('ZZZZZ... *(You don\'t have permission to wake me up.)');
            return;
        }    
    }  
   
    if(sleep === 1) {
        return;
    }
    
    if(message.content === 'vriska sucks.' || message.content === 'vriska sucks') {
        message.channel.sendMessage('No, she most certainly does not.');
        return;
    }

    if(message.content === "vriska doesn't suck." || message.content === "vriska doesn't suck") {
        message.channel.sendMessage('You\'re so right.');
        return;
    }

    if(!message.content.startsWith(trigger)) {
        return;
    }

    let cmd = message.content.split(' ')[0];
    cmd = cmd.slice(trigger.length);

    let origargs = origmsg.split(' ').slice(1);
    let args = message.content.split(' ').slice(1);

    timestamp();
    console.log(`${datime}: ${message.author.username}: "${message.content}"`);

    if(cmd === 'info') {
        message.reply(`Hello! My name is Vriskbot, version ${version}. I live on a Raspberry Pi! I serve a total ${bot.users.size} users across ${bot.guilds.size} servers. \n\n I was programmed - albeit not very well - by some guy named Luke. *(I\'ve heard he has a large forehead.)* \n Anyway, if you want to see what I can do, just do ${trigger}help.`);
        return;
    }
           
    if(cmd === 'ping') {
            //message.reply('pong');
            message.channel.sendMessage('Pong.');
            return;
    }

    if(cmd === 'say') {
        if(args.length === 0) {
            message.channel.sendMessage('You have to give me something to say.');
            return;
        } else {
            message.channel.sendMessage(origargs.join(' '));
            return;
        }
    }

    if(cmd === 'math') {
        message.channel.sendMessage('Do the math yourself. I\'m not your calculator.');
        return;
    }

    if(cmd === 'myid') {
        return message.reply(`Your Discord ID is ${message.author.id}.`);
        
    }
    
    if(cmd === 'dmme') {
         message.channel.sendMessage("'Kay.");
         bot.users.get(message.author.id).sendMessage("Yo.");
         return;
    }
    
   
    if(cmd === 'testembed') {
        message.channel.sendMessage('', {embed: {
            color: color1,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
            },
            title: 'This is an embed',
            url: 'http://google.com',
            description: 'This is a test embed to showcase what they look like and what they can do.',
            fields: [
                {
                    name: 'Fields',
                    value: 'They can have different fields with small headlines.'
                },
                {
                    name: 'Masked links',
                    value: 'You can put [masked links](http://google.com) inside of rich embeds.'
                },
                {
                    name: 'Markdown',
                    value: 'You can put all the *usual* **__Markdown__** inside of them.'
                }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: '© Example'
            }
        }}).catch(console.error);
        return;
    }

    if(cmd === 'help') {
        message.channel.sendMessage('', {embed: {
            color: color1,
            
            title: `Vriskbot, version ${version}.`,
            description: `Hi there, scrub! So you want some help using the bot? Well, here's a list of commands:`,
            fields: [
                {
                    name: `${trigger}info`, 
                    value: 'Information about the bot.'
                },
                {
                    name: `${trigger}ping`,
                    value: 'Pong!'
                },
                {
                    name: `${trigger}say`,
                    value: 'Basically turns me into your parrot.'
                },
                {
                    name: `${trigger}myid`,
                    value: 'Returns your Discord ID.'
                },
                {
                    name: `${trigger}help`,
                    value: 'Sends this message.'
                }
            ],
            timestamp: new Date(),
            footer: {
                text: 'For subcommands, do a specific command.'
            }
        }}).catch(console.error);
        return;
    } //end help command
        
        
        /*message.reply(`Hi there, scrub! So you want some help using the bot? Well, here's a list of commands:\n\n ${trigger}info: Information about the bot.\n : Pong!\n ${trigger}say: Basically turns me into your parrot.\n ${trigger}myid: Returns your Discord ID.\n\n For subcommands, do a specific command.`);
        return;*/


    
    
    if(message.author.id !== '193587165114925057' && message.author.id !== message.guild.owner.id) { 
        if(cmd === 'adminhelp' || cmd === 'mute' || cmd === 'unmute' || cmd === 'purge') {
            message.reply('You\'re such a pleb! You don\'t have permission to run this command. Freaking scrub.');
            return;
        }
    }

    if(cmd === 'adminhelp') {
        message.channel.sendMessage(`${trigger}mute, unmute, purge`);
        return;
    }
   
     if(cmd === 'mute' || cmd === 'unmute') {
        let mutedRole = message.guild.roles.find('name', 'Muted');
        let muteMember = message.guild.member(message.mentions.users.first());
        if(message.mentions.users.size === 0) {
            return message.channel.sendMessage(`Please mention a user to ${cmd}.`);
        }
        if(!message.guild.member(bot.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
            return message.channel.sendMessage('I don\'t have the proper permissions.');
        }
        if(cmd === 'mute') {
            if(muteMember.roles.has(mutedRole.id)) {
                return message.channel.sendMessage('This member is already muted.');
            }
            muteMember.addRole(mutedRole);
            message.channel.sendMessage(`${message.mentions.users.first()} has been muted.`);
            return;
        }
        if(cmd === 'unmute') {
            if(!muteMember.roles.has(mutedRole.id)) {
                return message.channel.sendMessage('This member isn\'t muted!');
            }
            muteMember.removeRole(mutedRole);
            message.channel.sendMessage(`${message.mentions.users.first()} has been unmuted.`);
            return;
        }
    } //end mute/unmute
     


     if(cmd === 'purge') {
        if(args.length === 0) {
            return message.channel.sendMessage('Please input the number of messages to be purged.');
        }

        if(message.mentions.users.size !== 0) {
            let messagecount = parseInt(args[1]);
            let purgeUser = (message.guild.member(message.mentions.users.first()).user);
            message.channel.fetchMessages({limit: 100})
            .then(messages => {
                let msg_array = messages.array();
                msg_array = msg_array.filter(m => m.author.id === purgeUser.id);
                msg_array.length = messagecount;
                msg_array.map(m => m.delete().catch(console.error));
            }).catch(console.error);
            return;

        } else {
            let messagecount = parseInt(args[0]);
            message.channel.fetchMessages({limit: messagecount + 1})
            .then(messages => {
                messages.map(m => m.delete().catch(console.error));
            }).catch(console.error);
            return;
        }
    } 
   



    if(message.author.id !== '193587165114925057') { 
        if(cmd === 'lockedhelp' || cmd === 'listusers' || cmd === 'listservers' || cmd === 'sleep' || cmd === 'shutdown' || cmd === 'eval' || cmd === 'update' || cmd === 'setgame' || cmd === 'runcmd' || cmd === 'selfbotreboot' || cmd === 'selfbotshutdown' || cmd === 'selfbotstart') {
            message.reply('You\'re such a pleb! You don\'t have permission to run this command. Freaking scrub.');
            return;
        } else {
            message.channel.sendMessage(`Sorry, scrub. Invalid command. Either learn to spell or do ${trigger}help for a list of commands.`);
            return;
        }
    }


   if(cmd === 'lockedhelp') {
        message.channel.sendMessage(`${trigger}mute, unmute, purge, listusers, listservers, sleep, reboot, eval, runcmd, update, selfbotreboot, selfbotshutdown, selfbotstart`);
        return;
   }
   
    if(cmd === 'listusers') {
        message.channel.sendMessage(`These are all the users that I serve: \`\`\`${bot.users.map(user => user.username).join(', ')}\`\`\``);
        return;
    }

    if(cmd === 'listservers') {
        message.channel.sendMessage(`These are all the servers that I'm on: \`\`\`${bot.guilds.map(guild => guild).join(', ')}\`\`\``);
        return;
    }

    if(cmd === 'selfbotreboot') {
        message.channel.sendMessage(`Just use ${trigger}selfbotshutdown and then ${trigger}selfbotstart. Less buggy.`);  
    }

    if(cmd === 'selfbotshutdown') {
        child = exec("pm2 stop SelfBot", function (error, stdout, stderr) {
            message.channel.sendMessage('Attempting to shut down SelfBot...');
            console.log(`Attempting to shut down SelfBot...`);
            if(error) return console.log(error);
            return;
            });
        return;
    }

    if(cmd === 'selfbotstart') {
        child = exec("pm2 start SelfBot --watch", function (error, stdout, stderr) {
            message.channel.sendMessage('Attempting to start SelfBot...');
            console.log(`Attempting to start SelfBot...`);
            if(error) return console.log(error);
            return;
            });
        return;
    }

    if(cmd === 'runcmd') {
        child = exec(origargs.join(' '), function (error, stdout, stderr) {
            message.channel.sendMessage(`Attempting to execute "${origargs.join(' ')}" in the terminal... `);
            console.log(`Attempting to execute "${origargs.join(' ')}"...`);
            if(error) {
                console.log(error);
                message.channel.sendMessage(`ERROR: \`\`\`${error}\`\`\``);
                return;
            } else {
                console.log(stdout);
                message.channel.sendMessage(`Result: \`\`\`${stdout}\`\`\``);
            }
        });
        return;
    }
    
    if(cmd === 'setgame') {
        bot.user.setGame(origargs.join(' '));
        message.channel.sendMessage(`Now playing "${origargs.join(' ')}".`);
        return;
    }


    if(cmd === 'sleep') {
        message.channel.sendMessage('Going to sleep...');
        bot.user.setStatus('idle');
        sleep = 1
        return;
    }

    if(cmd === 'reboot') {
        message.channel.sendMessage('Rebooting...');
        shutdown();
        return;         
    }
    

     if(cmd === 'eval') {
        try {
            var code = origargs.join(' ');
            var evaled = eval(code);

            if (typeof evaled !== 'string') {
                evaled = require('util').inspect(evaled);
            }

            message.channel.sendMessage(`:arrow_right: CODE: \`\`\`${code}\`\`\` \n:white_check_mark: RESULT: \`\`\`${evaled}\`\`\``);
            return;
        } catch(err) {
            message.channel.sendMessage(`:arrow_right: CODE: \`\`\`${code}\`\`\` \n:octagonal_sign: ERROR: \`\`\`${err}\`\`\``);
            return;
        }
    }


    if(cmd === 'update') {
        if(test === 0 || args[0] === 'override') {
            child = exec("git pull", function (error, stdout, stderr) {
            if(error) return console.log(error);
            let response = stdout.split(' ')[0];
            if(response === 'Updating') {
                message.channel.sendMessage('Successfully updated! Rebooting...');
                console.log(`Successfully updated. Rebooting...`);
                process.exit(1);
            } else {
                message.channel.sendMessage(stdout);
                console.log(`Update failed: ${stdout}`);
                return;
            }
            });
        } else {
            message.channel.sendMessage(`You can\'t update the testbot without using \`${trigger}update override.\``);
            return;
        }
    }

   if(cmd !== 'update') {
        message.channel.sendMessage(`Sorry, scrub. Invalid command. Either learn to spell or do ${trigger}help for a list of commands.`);
        return;
   }

}); //end message event

bot.on('guildMemberAdd', (member) => {
    console.log(`New member: ${member.user} on ${member.guild}.`);
    let guild = member.guild;
        guild.defaultChannel.sendMessage(`Welcome, ${member.user}, to the server! *(Now everyone bully the noob!)*`).catch(console.error);
}); //end new member added event

bot.on("guildMemberRemove", (member) => {
    console.log(`${member.user.username} has left ${member.guild}.`);
    let guild = member.guild;
        guild.defaultChannel.sendMessage(`${member.user.username} has left the server. Guess someone got salty.`);

}); //end member leaves event


if(test === 1) {
    bot.login(config.tokenTest);
    console.log('Ready for testing!');
} else {
    bot.login(config.tokenVrisk);
    console.log('This is not a drill!');
} //end login


bot.on('ready', () => {
    timestamp();
    console.log(`ALERT: ${datime}: Bot is up and running. Press CTRL+C to stop...`);
    bot.channels.get('262249669692882946').sendMessage(`${datime}: Vriskbot online, version ${version}. Serving ${bot.users.size} users across ${bot.guilds.size} servers.`);
}); //end readylog

function timestamp() {
    let date = new Date();
    
    let yy = date.getFullYear();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    let h = date.getHours(); h = (h < 10 ? "0" : "") + h;
    let m = date.getMinutes(); m = (m < 10 ? "0" : "") + m;
    let s = date.getSeconds(); s = (s < 10 ? "0" : "") + s;
    
    datime = `${yy}/${mm}/${dd}, ${h}:${m}:${s}`

}


function shutdown() {
    console.log('Shutdown commencing...');
    process.exit(1);
    }

bot.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});


} //end everything();
everything();
