//
//  ErrorManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/25/21.
//

import Foundation

@MainActor
final class ErrorManager: ObservableObject {
	
	// Singleton instance in order for the app to post alerts easily
	static let shared = ErrorManager()
	
	@Published var alertItem: AlertItem?
	
	func presentAlert(_ alert: AlertItem) { alertItem = alert }
}
