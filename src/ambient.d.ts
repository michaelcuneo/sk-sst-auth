type Mailer = {
	email: string;
	service: string;
	host: string;
	port: number;
	username: string;
	password: string;
};

type User = {
	id: string;
	email: string;
};

type UserToken = {
	userId: string;
	iat: number;
	exp: number;
};

type UserLookup = {
	id: string;
};

type Session = {
	id: string;
};

type AppSyncEvent = {
	info: {
		fieldName: string;
	};
	arguments: {
		user: User;
		userId: string;
	};
};

type Theme = {
	value: 'system' | 'light' | 'dark';
};
