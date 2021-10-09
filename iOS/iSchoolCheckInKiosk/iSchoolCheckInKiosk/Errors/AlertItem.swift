//
//  AlertItem.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/25/21.
//

import SwiftUI

struct AlertItem: Identifiable {
	let id = UUID()
	let title: Text
	let message: Text
	let dismissButton: Alert.Button
	
	init(title: String, message: String, dismissBtn: Alert.Button = .default(Text("OK"))) {
		self.title         = Text(title)
		self.message       = Text(message)
		self.dismissButton = dismissBtn
	}
}


enum AlertContext {
	static let networkAlert = AlertItem(title: AlertTitle.networkError, message: AlertMessage.networkError)
	
	static let identificationError = AlertItem(title: AlertTitle.identificationError, message: AlertMessage.nextStep)
}


fileprivate enum AlertTitle {
	static let networkError = "Network Error"
	static let identificationError = "Error Identifying Student"
}


fileprivate enum AlertMessage {
	static let networkError = "There was a problem connecting to the Check In system. \(nextStep)"
	
	
	static let nextStep     = "Please ask the front desk for assistance."
}
