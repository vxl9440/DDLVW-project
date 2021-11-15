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
	static let cardReaderError = AlertItem(title: AlertTitle.cardReaderError, message: AlertMessage.cardReaderError)
	static let identificationError = AlertItem(title: AlertTitle.identificationError, message: AlertMessage.nextStep)
	static let noAvailableAdvisor = AlertItem(title: AlertTitle.noAdvisors, message: AlertMessage.noAdvisors)
	static let systemError = AlertItem(title: AlertTitle.systemErr, message: AlertMessage.nextStep)
}


fileprivate enum AlertTitle {
	static let networkError = "Network Error"
	static let cardReaderError = "Card Reader Error"
	static let identificationError = "Error Identifying Student"
	static let noAdvisors = "No Advisors"
	static let systemErr = "There was an error processing request"
}


fileprivate enum AlertMessage {
	static let networkError = "There was a problem connecting to the Check In system. \(nextStep)"
	static let cardReaderError = "There was a problem reading card data. Please try again or ask for assistance."
	static let noAdvisors = "There are currently no advisors meeting with walk-ins."
	
	static let nextStep     = "Please ask the front desk for assistance."
}
