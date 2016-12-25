function everything() {

const trigger = '%';
const version = 'V1.1.1';

const config = require('../configVrisk.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
var exec = require('child_process').exec;
var sleep = 0;
var downshut = 0;

var path = require('path');
var scriptName = path.basename(__filename); //writes name of JS file as scriptName

if(scriptName === 'buildT.js') {
    test = 1;
}
if(scriptName === 'buildV.js') {
    test = 0;
}



bot.on('message', (message) => {

    if(message.author.bot) {
        return;
    }
    
    var origmsg = message.content;
    message.content = message.content.toLowerCase();
    
    if(downshut === 1) {
        if(message.content === 'y') {
            shutdown();
        } else if(message.content === 'n') {
            message.channel.sendMessage('That was a close one!');
            console.log('Shutdown canceled.');
            downshut = 0
            return;
        } else {
            return;
        }
    }


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

    console.log(`${message.author.username}: "${message.content}"`);

    if(cmd === 'info') {
        message.reply(`Hello! My name is Vriskbot, version ${version}. I live on a Raspberry Pi! \n I was programmed - albeit not very well - by some guy named Luke. *(I\'ve heard he has a large forehead.)* Anyway, if you want to see what I can do, just do %help.`);
        return;
    }
           
    if(cmd === 'ping') {
            //message.reply('pong');
            message.channel.sendMessage('Pong.');
            return;
    }

    if(cmd === 'say') {
        message.channel.sendMessage(origargs.join(' '));
        return;
    }

    if(cmd === 'math') {
        
        if(args[0] === 'add') {

            args = args.slice(1);
            let numArray = args.map(n=> parseInt(n));

            let sum = 0;
            for(let i=0; i<numArray.length; i++) {
                sum += numArray[i];
            }

            if(numArray.length === 0) {
                 message.channel.sendMessage('Usage: "%math add [number] [number]".');
                 return;
            } else {
                if(sum !== sum) {
                    if(args.length === 0) {
                    } else {
                        message.channel.sendMessage('I can\'t add that.');
                        return;
                    }
                } else {  
                    message.channel.sendMessage(`The sum of those numbers is ${sum}.`);
                    return;
                }
            }
        } else {
            message.channel.sendMessage(`Subcommands for ${trigger}math: add.`);
            return;
        }
    }
    if(cmd === 'myid') {
        message.reply(`Your Discord ID is ${message.author.id}.`);
        return;
    }
    

    if(cmd === 'help') {
        message.reply(`Hi there, scrub! So you want some help using the bot? Well, here's a list of commands:\n\n ${trigger}info: Information about the bot.\n ${trigger}ping: Pong!\n ${trigger}say: Basically turns me into your parrot.\n ${trigger}math: Various calculator functions.\n ${trigger}myid: Returns your Discord ID.\n\n For subcommands, do a specific command.`);
        return;
    }

    
    
    if(message.author.id !== '193587165114925057') { 
        if(cmd === 'mute' || cmd === 'sleep' || cmd === 'shutdown' || cmd === 'eval' || cmd === 'update' || cmd === 'setgame') {
            message.reply('You\'re such a pleb! You don\'t have permission to run this command. Freaking scrub.');
            return;
        } else {
            message.channel.sendMessage('Sorry, scrub. Invalid command. Either learn to spell or do %help for a list of commands.');
            return;
        }
    }

    if(cmd === 'setgame') {
        bot.user.setGame(origargs.join(' '));
        message.channel.sendMessage(`Now playing "${origargs.join(' ')}".`);
        return;
    }

    if(cmd === 'lockedhelp') {
        message.channel.sendMessage(`${trigger}mute, sleep, shutdown, eval, update, setgame`);
        return;
    }

    if(cmd === 'mute') {
        let mutedRole = message.guild.roles.find('name', 'Muted');
        let muteMember = message.guild.member(message.mentions.users.first());
        if(message.mentions.users.size === 0) {
            return message.channel.sendMessage('Please mention a user to mute.');
        }
        if(1 === 0) {
            return message.channel.sendMessage('I don\'t have the proper permissions.');
        }
        muteMember.addRole(mutedRole);
        message.channel.sendMessage(`${message.mentions.users.first()} has been muted.`);
        return;
    }
     if(cmd === 'unmute') {
        let mutedRole = message.guild.roles.find('name', 'Muted');
        let muteMember = message.guild.member(message.mentions.users.first());
        if(message.mentions.users.size === 0) {
            return message.channel.sendMessage('Please mention a user to unmute.');
        }
        if(1 === 0) {
            return message.channel.sendMessage('I don\'t have the proper permissions.');
        }
        if(1 === 0) {
            return message.channel.sendMessage('This member isn\'t muted!');
        }
        muteMember.removeRole(mutedRole);
        message.channel.sendMessage(`${message.mentions.users.first()} has been unmuted.`)

        return;
   
    }


    if(cmd === 'sleep') {
        message.channel.sendMessage('Going to sleep...');
        bot.user.setStatus('idle');
        sleep = 1
        return;
    }

    if(cmd === 'shutdown') {
        message.channel.sendMessage('Are you sure you want to shut down the bot? Y/N');
        downshut = 1
        return;         
    }
    

    if(cmd === 'eval') {
        try {
            var code = args.join(' ');
            var evaled = eval(code);

            if (typeof evaled !== 'string') {
                evaled = require('util').inspect(evaled);
            }

            message.channel.sendCode('xl', evaled);
            return;
        } catch(err) {
            message.channel.sendMessage(`ERROR: ${err}`);
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
            message.channel.sendMessage('You can\'t update the testbot without using `%update override.`');
            return;
        }
    }

   if(cmd !== 'update') {
        message.channel.sendMessage('Sorry, scrub. Invalid command. Either learn to spell or do %help for a list of commands.');
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
    console.log('Bot is up and running. Press CTRL+C to stop...');
    bot.channels.get('262249669692882946').sendMessage(`Bot online, version ${version}.`);

}); //end readylog



function shutdown() {
    console.log('Shutdown commencing...');
    process.exit(1);
    }




} //end everything();
everything();
