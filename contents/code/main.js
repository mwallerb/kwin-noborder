/*
 *  Copyright 2018 Markus Wallerberger
 *
 *  This script is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, precisely version 2 of the License, and
 *  not any other one.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this script.  If not, see <http://www.gnu.org/licenses/>.
 */
var hideIfMaximized = true;

function isVMaxed(client)
{
    var area = workspace.clientArea(0, client.screen, 0);
    return (client.geometry.height >= area.height);
}

var handleNewClient = function(client)
{
    //print(client.caption + " is a new client");
    var is_vmaxed = isVMaxed(client);
    //print("Is maxed: " + is_vmaxed);
    client.noBorder = (hideIfMaximized && is_vmaxed);
}

var handleMaximize = function(client, h, v)
{
    //print(client.caption + " maximization status has changed: "
    //      + (v ? "vertically, " : "") + (h ? "horizontally" : ""));
    client.noBorder = hideIfMaximized && v;
}

var handleTopEdge = function()
{
    print("Top Screen Edge activated. Hiding state was: " + hideIfMaximized);
    hideIfMaximized = !hideIfMaximized;

    var clients = workspace.clientList();
    //print("Registered " + clients.length + " clients");
    for (var i = 0; i != clients.length; ++i) {
        var client = clients[i];
        var is_vmaxed = isVMaxed(client);
        //print(client.caption + " - " + is_vmaxed);
        client.noBorder = (hideIfMaximized && is_vmaxed);
    }
}

workspace.clientAdded.connect(handleNewClient);
workspace.clientMaximizeSet.connect(handleMaximize);
registerScreenEdge(KWin.ElectricTop, handleTopEdge);
handleTopEdge();
print("Loaded script\n");
