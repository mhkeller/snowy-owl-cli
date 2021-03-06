var helpers = {
	createRemoteUrl: function(login_method, account, repo){
		if (login_method == 'ssh'){
			return 'git@github.com:' + account + '/' + repo + '.git'
		}else if (login_method == 'https'){
			return 'https://github.com/' + account + '/' + repo + '.git';
		}
	}
}
var sh_commands = {
	kestrelInit: function(){
		return 'mkdir .kestrel';
	},
	gitInit: function(login_method, account, repo){
		return 'git init';
	},
	setGitRemote: function(login_method, account, repo){
		return 'git remote add origin ' + helpers.createRemoteUrl(login_method, account, repo);
	},
	getGitRemoteProjectName: function(){
		return 'git remote show origin -n | grep "Fetch URL:"'
	},
	archive: function(login_method, account, repo, local_branch, remote_branch){
		return ['git', ['push', helpers.createRemoteUrl(login_method, account, repo), [local_branch,remote_branch].join(':') ] ];
	},
	status: function(){
		return 'git status -sb';
	},
	statusPorcelain: function(){
		return 'git status --porcelain';
	},
	revertToPreviousCommit: function(){
		return 'git reset --soft \'HEAD^\' && git stash';
	},
	makeEmptyCommitMsg: function(trigger_commit_msg){
		return 'git add .kestrel/deploy-settings.json && git commit -m "' + trigger_commit_msg + '" --allow-empty';
	},
	spawnPush: function(){
		return ['git', ['push', 'origin', 'master']];
	},
	getLocalBranches: function(){
		return 'git branch --list';
	},
	getCurrentBranch: function(){
		return 'git rev-parse --abbrev-ref HEAD';
	}
}

module.exports = sh_commands;