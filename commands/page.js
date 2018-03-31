function(message, pages) {

    let page = 1;
    const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page - 1])

    message.channel.send(embed).then(msg => {

        msg.react('⏪').then(r => {
            msg.react('⏩')

            const backwards = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id, {
                time: 60000
            });
            const forwards = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id, {
                time: 60000
            });

            function reset() {
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed)
            }

            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                reset()
            })

            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                reset()
            })
        })
    })
},
